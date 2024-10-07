'use client';

import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import {
  fetchClientes,
  addCliente,
  editCliente,
  removeCliente,
} from '../../../../store/slices/clienteSlice';
import { Button } from '@/components/ui/button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';

type Cliente = {
  clienteID: number; // Asegúrate de que clienteID sea solo `number` para evitar errores de incompatibilidad.
  nombre: string;
  direccion: string;
  telefono: string;
  email: string;
};

const Clientes = () => {
  const dispatch = useAppDispatch();
  const { clientes, loading, error } = useAppSelector((state) => state.cliente);

  const [currentCliente, setCurrentCliente] = useState<Cliente | null>(null);
  const [newCliente, setNewCliente] = useState<Cliente>({
    clienteID: 0, // Debe ser un valor inicial válido, como `0`
    nombre: '',
    direccion: '',
    telefono: '',
    email: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<{ visible: boolean; clienteID: number | null }>({ visible: false, clienteID: null });
  const [showEditModal, setShowEditModal] = useState<boolean>(false);

  useEffect(() => {
    dispatch(fetchClientes());
  }, [dispatch]);

  // Función para eliminar un cliente
  const handleDelete = async () => {
    if (showDeleteModal.clienteID === null) {
      toast.error('El ID del cliente no es válido');
      return;
    }

    setIsSubmitting(true);
    try {
      await dispatch(removeCliente(showDeleteModal.clienteID)).unwrap();
      toast.success('Cliente eliminado correctamente');

      // Re-fetch clients to ensure UI is up to date
      dispatch(fetchClientes());
    } catch (err) {
      toast.error('Error al eliminar el cliente');
    } finally {
      setIsSubmitting(false);
      setShowDeleteModal({ visible: false, clienteID: null });
    }
  };

  // Función para guardar un cliente (añadir o editar)
  const handleSave = async () => {
    setIsSubmitting(true);
    try {
      if (showEditModal && currentCliente) {
        await dispatch(editCliente({ id: currentCliente.clienteID, cliente: newCliente })).unwrap();
        toast.success('Cliente actualizado correctamente');

        // Re-fetch clients to ensure UI is up to date
        dispatch(fetchClientes());
      } else {
        await dispatch(addCliente(newCliente)).unwrap();
        toast.success('Cliente agregado correctamente');

        // Re-fetch clients to ensure UI is up to date
        dispatch(fetchClientes());
      }

      // Reiniciar el formulario
      setNewCliente({ clienteID: 0, nombre: '', direccion: '', telefono: '', email: '' });
      setCurrentCliente(null);
      setShowEditModal(false);
    } catch (err) {
      toast.error('Error al guardar el cliente');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Función para activar la edición de un cliente y abrir el modal
  const handleEdit = (cliente: Cliente) => {
    if (cliente.clienteID === null) {
      toast.error('El ID del cliente no es válido para editar');
      return;
    }

    setCurrentCliente(cliente);
    setNewCliente(cliente);
    setShowEditModal(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
        <span className="ml-4">Cargando...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 flex justify-center items-center h-full">
        {error}
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md relative mt-6 mx-6">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4 text-indigo-800">Clientes</h1>
      <div className="mb-4 flex items-center space-x-2">
        <input
          type="text"
          className="border p-2 rounded mr-2"
          placeholder="Nombre"
          value={newCliente.nombre}
          onChange={(e) =>
            setNewCliente({ ...newCliente, nombre: e.target.value })
          }
        />
        <input
          type="text"
          className="border p-2 rounded mr-2"
          placeholder="Dirección"
          value={newCliente.direccion}
          onChange={(e) =>
            setNewCliente({ ...newCliente, direccion: e.target.value })
          }
        />
        <input
          type="text"
          className="border p-2 rounded mr-2"
          placeholder="Teléfono"
          value={newCliente.telefono}
          onChange={(e) =>
            setNewCliente({ ...newCliente, telefono: e.target.value })
          }
        />
        <input
          type="email"
          className="border p-2 rounded mr-2"
          placeholder="Email"
          value={newCliente.email}
          onChange={(e) =>
            setNewCliente({ ...newCliente, email: e.target.value })
          }
        />
        <Button
          onClick={handleSave}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
              Procesando...
            </div>
          ) : (
            'Agregar Cliente'
          )}
        </Button>
      </div>

      <table className="min-w-full bg-white mt-4">
        <thead className="bg-indigo-600 text-white">
          <tr>
            <th className="py-2 px-4 text-center">Nombre</th>
            <th className="py-2 px-4 text-center">Dirección</th>
            <th className="py-2 px-4 text-center">Teléfono</th>
            <th className="py-2 px-4 text-center">Email</th>
            <th className="py-2 px-4 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.length > 0 ? (
            clientes.map((cliente: Cliente, index: number) => (
              <tr key={cliente.clienteID ?? `cliente-${index}`} className="even:bg-indigo-50">
                <td className="py-2 px-4 text-center">{cliente.nombre}</td>
                <td className="py-2 px-4 text-center">{cliente.direccion}</td>
                <td className="py-2 px-4 text-center">{cliente.telefono}</td>
                <td className="py-2 px-4 text-center">{cliente.email}</td>
                <td className="py-2 px-4 text-center">
                  <div className="flex justify-center items-center space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => handleEdit(cliente)}
                      className="border-indigo-600 text-indigo-600 px-3 py-1 rounded-md"
                      disabled={isSubmitting}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => setShowDeleteModal({ visible: true, clienteID: cliente.clienteID })}
                      className="bg-red-600 text-white px-3 py-1 rounded-md"
                      disabled={isSubmitting}
                    >
                      Eliminar
                    </Button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="py-4 text-center text-gray-500">
                No hay clientes disponibles.
              </td>
            </tr>
          )}
        </tbody>

      </table>

      {/* Modal de Confirmación para Eliminar */}
      {showDeleteModal.visible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md shadow-lg">
            <h2 className="text-lg font-semibold mb-4">¿Está seguro que desea eliminar este cliente?</h2>
            <div className="flex justify-end space-x-4">
              <Button
                variant="outline"
                onClick={() => setShowDeleteModal({ visible: false, clienteID: null })}
              >
                Cancelar
              </Button>
              <Button
                variant="destructive"
                onClick={handleDelete}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Eliminando...' : 'Eliminar'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Dialog para Editar Cliente */}
      {showEditModal && (
        <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
          <DialogContent>
            <DialogTitle>Editar Cliente</DialogTitle>
            <DialogDescription>
              Edita la información del cliente a continuación.
            </DialogDescription>
            <div className="mb-4">
              <input
                type="text"
                className="border p-2 rounded w-full mb-4"
                placeholder="Nombre"
                value={newCliente.nombre}
                onChange={(e) =>
                  setNewCliente({ ...newCliente, nombre: e.target.value })
                }
              />
              <input
                type="text"
                className="border p-2 rounded w-full mb-4"
                placeholder="Dirección"
                value={newCliente.direccion}
                onChange={(e) =>
                  setNewCliente({ ...newCliente, direccion: e.target.value })
                }
              />
              <input
                type="text"
                className="border p-2 rounded w-full mb-4"
                placeholder="Teléfono"
                value={newCliente.telefono}
                onChange={(e) =>
                  setNewCliente({ ...newCliente, telefono: e.target.value })
                }
              />
              <input
                type="email"
                className="border p-2 rounded w-full"
                placeholder="Email"
                value={newCliente.email}
                onChange={(e) =>
                  setNewCliente({ ...newCliente, email: e.target.value })
                }
              />
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowEditModal(false)}
              >
                Cancelar
              </Button>
              <Button
                variant="default"
                onClick={handleSave}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Guardando...' : 'Guardar'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Clientes;
