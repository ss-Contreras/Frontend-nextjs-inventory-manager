'use client';

import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import {
    fetchEmpleados,
    addEmpleado,
    editEmpleado,
    removeEmpleado,
} from '../../../../store/slices/empleadoSlice';
import { Button } from '@/components/ui/button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';

type Empleado = {
  empleadoID?: number; // Optional for new employees
  nombre: string;
  telefono: string;
  email: string;
  direccion: string;
  cargo: string;
  fechaContratacion: string; 
};

const Empleados = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.empleado);

  const [currentEmpleado, setCurrentEmpleado] = useState<Empleado | null>(null);
  const [newEmpleado, setNewEmpleado] = useState<Empleado>({
    nombre: '',
    telefono: '',
    email: '',
    direccion: '',
    cargo: '',
    fechaContratacion: '',
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<{ visible: boolean; empleadoID: number | null }>({ visible: false, empleadoID: null });
  const [showEditModal, setShowEditModal] = useState<boolean>(false);

  const [localEmpleados, setLocalEmpleados] = useState<Empleado[]>([]);

  // Fetch employees and set local state
  const fetchAndSetEmpleados = async () => {
    try {
      const fetchedEmpleados = await dispatch(fetchEmpleados()).unwrap();
      setLocalEmpleados(fetchedEmpleados);
    } catch (error) {
      toast.error('Error al cargar los empleados');
    }
  };

  useEffect(() => {
    fetchAndSetEmpleados();
  }, [dispatch]);

  // Eliminar un empleado
  const handleDelete = async () => {
    if (showDeleteModal.empleadoID === null) {
      toast.error('El ID del empleado no es válido');
      return;
    }

    setIsSubmitting(true);
    try {
      await dispatch(removeEmpleado(showDeleteModal.empleadoID)).unwrap();
      toast.success('Empleado eliminado correctamente');

      // Eliminar localmente el empleado
      setLocalEmpleados((prevEmpleados) =>
        prevEmpleados.filter((emp) => emp.empleadoID !== showDeleteModal.empleadoID)
      );
    } catch (err) {
      toast.error('Error al eliminar el empleado');
    } finally {
      setIsSubmitting(false);
      setShowDeleteModal({ visible: false, empleadoID: null });
    }
  };

  // Guardar un empleado (añadir o editar)
  const handleSave = async () => {
    // Validar campos obligatorios
    if (!newEmpleado.nombre || !newEmpleado.telefono || !newEmpleado.email || !newEmpleado.direccion || !newEmpleado.cargo || !newEmpleado.fechaContratacion) {
      toast.error('Todos los campos son obligatorios');
      return;
    }

    setIsSubmitting(true);
    try {
      if (showEditModal && currentEmpleado && currentEmpleado.empleadoID !== undefined) {
        // Editar empleado
        await dispatch(editEmpleado({ id: currentEmpleado.empleadoID, empleado: newEmpleado })).unwrap();
        toast.success('Empleado actualizado correctamente');

        // Actualizar el estado local con los datos editados
        setLocalEmpleados((prevEmpleados) =>
          prevEmpleados.map((emp) =>
            emp.empleadoID === currentEmpleado.empleadoID ? { ...newEmpleado, empleadoID: currentEmpleado.empleadoID } : emp
          )
        );
      } else {
        // Añadir empleado nuevo
        const createdEmpleado = await dispatch(addEmpleado(newEmpleado)).unwrap();
        toast.success('Empleado agregado correctamente');

        // Agregar el nuevo empleado a la lista local
        setLocalEmpleados((prevEmpleados) => [...prevEmpleados, createdEmpleado]);
      }

      // Reiniciar el formulario
      setNewEmpleado({
        nombre: '',
        telefono: '',
        email: '',
        direccion: '',
        cargo: '',
        fechaContratacion: '',
      });
      setCurrentEmpleado(null);
      setShowEditModal(false);
    } catch (err) {
      toast.error('Error al guardar el empleado');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Activar la edición de un empleado y abrir el modal
  const handleEdit = (empleado: Empleado) => {
    if (empleado.empleadoID === undefined) {
      toast.error('El ID del empleado no es válido para editar');
      return;
    }

    setCurrentEmpleado(empleado);
    setNewEmpleado({ ...empleado });
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
      <h1 className="text-2xl font-bold mb-4 text-indigo-800">Empleados</h1>
      <div className="mb-4 flex items-center flex-wrap gap-4">
        <input
          type="text"
          className="border p-2 rounded"
          placeholder="Nombre"
          value={newEmpleado.nombre}
          onChange={(e) =>
            setNewEmpleado({ ...newEmpleado, nombre: e.target.value })
          }
        />
        <input
          type="text"
          className="border p-2 rounded"
          placeholder="Teléfono"
          value={newEmpleado.telefono}
          onChange={(e) =>
            setNewEmpleado({ ...newEmpleado, telefono: e.target.value })
          }
        />
        <input
          type="email"
          className="border p-2 rounded"
          placeholder="Email"
          value={newEmpleado.email}
          onChange={(e) =>
            setNewEmpleado({ ...newEmpleado, email: e.target.value })
          }
        />
        <input
          type="text"
          className="border p-2 rounded"
          placeholder="Dirección"
          value={newEmpleado.direccion}
          onChange={(e) =>
            setNewEmpleado({ ...newEmpleado, direccion: e.target.value })
          }
        />
        <input
          type="text"
          className="border p-2 rounded"
          placeholder="Cargo"
          value={newEmpleado.cargo}
          onChange={(e) =>
            setNewEmpleado({ ...newEmpleado, cargo: e.target.value })
          }
        />
        <input
          type="date"
          className="border p-2 rounded"
          placeholder="Fecha de Contratación"
          value={newEmpleado.fechaContratacion}
          onChange={(e) =>
            setNewEmpleado({ ...newEmpleado, fechaContratacion: e.target.value })
          }
        />
        <Button
          onClick={handleSave}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Procesando...' : showEditModal ? 'Actualizar Empleado' : 'Agregar Empleado'}
        </Button>
      </div>

      <table className="min-w-full bg-white mt-4">
        <thead className="bg-indigo-600 text-white">
          <tr>
            <th className="py-2 px-4 text-center">Nombre</th>
            <th className="py-2 px-4 text-center">Teléfono</th>
            <th className="py-2 px-4 text-center">Email</th>
            <th className="py-2 px-4 text-center">Dirección</th>
            <th className="py-2 px-4 text-center">Cargo</th>
            <th className="py-2 px-4 text-center">Fecha de Contratación</th>
            <th className="py-2 px-4 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {localEmpleados.length > 0 ? (
            localEmpleados.map((empleado, index) => (
              <tr key={empleado.empleadoID ?? `empleado-${index}`} className="even:bg-indigo-50">
                <td className="py-2 px-4 text-center">{empleado.nombre}</td>
                <td className="py-2 px-4 text-center">{empleado.telefono}</td>
                <td className="py-2 px-4 text-center">{empleado.email}</td>
                <td className="py-2 px-4 text-center">{empleado.direccion}</td>
                <td className="py-2 px-4 text-center">{empleado.cargo}</td>
                <td className="py-2 px-4 text-center">{empleado.fechaContratacion}</td>
                <td className="py-2 px-4 text-center">
                  <div className="flex justify-center items-center space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => handleEdit(empleado)}
                      className="border-indigo-600 text-indigo-600 px-3 py-1 rounded-md"
                      disabled={isSubmitting}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => setShowDeleteModal({ visible: true, empleadoID: empleado.empleadoID! })}
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
              <td colSpan={7} className="py-4 text-center text-gray-500">
                No hay empleados disponibles.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Dialog para Confirmación de Eliminación */}
      {showDeleteModal.visible && (
        <Dialog open={showDeleteModal.visible} onOpenChange={() => setShowDeleteModal({ visible: false, empleadoID: null })}>
          <DialogContent>
            <DialogTitle>Eliminar Empleado</DialogTitle>
            <DialogDescription>¿Estás seguro que deseas eliminar este empleado?</DialogDescription>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowDeleteModal({ visible: false, empleadoID: null })}>
                Cancelar
              </Button>
              <Button variant="destructive" onClick={handleDelete} disabled={isSubmitting}>
                {isSubmitting ? 'Eliminando...' : 'Eliminar'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Dialog para Editar Empleado */}
      {showEditModal && (
        <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
          <DialogContent>
            <DialogTitle>Editar Empleado</DialogTitle>
            <DialogDescription>Edita la información del empleado a continuación.</DialogDescription>
            <div className="mb-4">
              <input
                type="text"
                className="border p-2 rounded w-full mb-4"
                placeholder="Nombre"
                value={newEmpleado.nombre}
                onChange={(e) => setNewEmpleado({ ...newEmpleado, nombre: e.target.value })}
              />
              <input
                type="text"
                className="border p-2 rounded w-full mb-4"
                placeholder="Teléfono"
                value={newEmpleado.telefono}
                onChange={(e) => setNewEmpleado({ ...newEmpleado, telefono: e.target.value })}
              />
              <input
                type="email"
                className="border p-2 rounded w-full mb-4"
                placeholder="Email"
                value={newEmpleado.email}
                onChange={(e) => setNewEmpleado({ ...newEmpleado, email: e.target.value })}
              />
              <input
                type="text"
                className="border p-2 rounded w-full mb-4"
                placeholder="Dirección"
                value={newEmpleado.direccion}
                onChange={(e) => setNewEmpleado({ ...newEmpleado, direccion: e.target.value })}
              />
              <input
                type="text"
                className="border p-2 rounded w-full mb-4"
                placeholder="Cargo"
                value={newEmpleado.cargo}
                onChange={(e) => setNewEmpleado({ ...newEmpleado, cargo: e.target.value })}
              />
              <input
                type="date"
                className="border p-2 rounded w-full mb-4"
                value={newEmpleado.fechaContratacion}
                onChange={(e) => setNewEmpleado({ ...newEmpleado, fechaContratacion: e.target.value })}
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

export default Empleados;
