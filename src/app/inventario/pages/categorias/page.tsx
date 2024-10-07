'use client';

import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import {
    fetchCategorias,
    addCategoria,
    editCategoria,
    removeCategoria,
} from '../../../../store/slices/categoriaSlice';
import { Button } from '@/components/ui/button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';

type Categoria = {
  categoriaID: number | null; // Ajustado de `number | undefined | null` a `number | null`
  nombre: string;
  descripcion: string;
};

const Categorias = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.categoria);

  const [currentCategoria, setCurrentCategoria] = useState<Categoria | null>(null);
  const [newCategoria, setNewCategoria] = useState<Categoria>({ categoriaID: null, nombre: '', descripcion: '' });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<{ visible: boolean; categoriaID: number | null }>({ visible: false, categoriaID: null });
  const [showEditModal, setShowEditModal] = useState<boolean>(false);

  const [localCategorias, setLocalCategorias] = useState<Categoria[]>([]);

  // Function to fetch categories and set local state
  const fetchAndSetCategorias = async () => {
    try {
      const fetchedCategorias = await dispatch(fetchCategorias()).unwrap();
      setLocalCategorias(fetchedCategorias);
    } catch (error) {
      toast.error('Error al cargar las categorías');
    }
  };

  useEffect(() => {
    fetchAndSetCategorias();
  }, [dispatch]);

  // Función para eliminar una categoría
  const handleDelete = async () => {
    if (showDeleteModal.categoriaID === null) {
      toast.error('El ID de la categoría no es válido');
      return;
    }

    setIsSubmitting(true);
    try {
      await dispatch(removeCategoria(showDeleteModal.categoriaID)).unwrap();
      toast.success('Categoría eliminada correctamente');

      // Re-fetch categories to ensure UI is up to date
      await fetchAndSetCategorias();
    } catch (err) {
      toast.error('Error al eliminar la categoría');
    } finally {
      setIsSubmitting(false);
      setShowDeleteModal({ visible: false, categoriaID: null });
    }
  };

  // Función para guardar una categoría (añadir o editar)
  const handleSave = async () => {
    setIsSubmitting(true);
    try {
      if (showEditModal && currentCategoria && currentCategoria.categoriaID !== null) {
        await dispatch(editCategoria({ id: currentCategoria.categoriaID, categoria: newCategoria })).unwrap();
        toast.success('Categoría actualizada correctamente');

        // Re-fetch categories to ensure UI is up to date
        await fetchAndSetCategorias();
      } else {
        const createdCategoria = await dispatch(addCategoria(newCategoria)).unwrap();
        toast.success('Categoría agregada correctamente');

        // Agregar la nueva categoría a la lista local de categorías
        setLocalCategorias((prevCategorias) => [...prevCategorias, createdCategoria]);
      }

      // Reiniciar el formulario
      setNewCategoria({ categoriaID: null, nombre: '', descripcion: '' });
      setCurrentCategoria(null);
      setShowEditModal(false);
    } catch (err) {
      toast.error('Error al guardar la categoría');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Función para activar la edición de una categoría y abrir el modal
  const handleEdit = (categoria: Categoria) => {
    if (categoria.categoriaID === null) {
      toast.error('El ID de la categoría no es válido para editar');
      return;
    }

    setCurrentCategoria(categoria);
    setNewCategoria({ categoriaID: categoria.categoriaID, nombre: categoria.nombre, descripcion: categoria.descripcion });
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
      <h1 className="text-2xl font-bold mb-4 text-indigo-800">Categorías</h1>
      <div className="mb-4 flex items-center space-x-2">
        <input
          type="text"
          className="border p-2 rounded mr-2"
          placeholder="Nombre"
          value={newCategoria.nombre}
          onChange={(e) =>
            setNewCategoria({ ...newCategoria, nombre: e.target.value })
          }
        />
        <input
          type="text"
          className="border p-2 rounded mr-2"
          placeholder="Descripción"
          value={newCategoria.descripcion}
          onChange={(e) =>
            setNewCategoria({ ...newCategoria, descripcion: e.target.value })
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
            'Agregar Categoría'
          )}
        </Button>
      </div>

      <table className="min-w-full bg-white mt-4">
        <thead className="bg-indigo-600 text-white">
          <tr>
            <th className="py-2 px-4 text-center">Nombre</th>
            <th className="py-2 px-4 text-center">Descripción</th>
            <th className="py-2 px-4 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {localCategorias.length > 0 ? (
            localCategorias.map((categoria, index) => (
              <tr key={categoria.categoriaID ?? `categoria-${index}`} className="even:bg-indigo-50">
                <td className="py-2 px-4 text-center">{categoria.nombre}</td>
                <td className="py-2 px-4 text-center">{categoria.descripcion}</td>
                <td className="py-2 px-4 text-center">
                  <div className="flex justify-center items-center space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => handleEdit(categoria)}
                      className="border-indigo-600 text-indigo-600 px-3 py-1 rounded-md"
                      disabled={isSubmitting}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => setShowDeleteModal({ visible: true, categoriaID: categoria.categoriaID })}
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
              <td colSpan={3} className="py-4 text-center text-gray-500">
                No hay categorías disponibles.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal de Confirmación para Eliminar */}
      {showDeleteModal.visible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md shadow-lg">
            <h2 className="text-lg font-semibold mb-4">¿Está seguro que desea eliminar esta categoría?</h2>
            <div className="flex justify-end space-x-4">
              <Button
                variant="outline"
                onClick={() => setShowDeleteModal({ visible: false, categoriaID: null })}
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

      {/* Dialog para Editar Categoría */}
      {showEditModal && (
        <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
          <DialogContent>
            <DialogTitle>Editar Categoría</DialogTitle>
            <DialogDescription>
              Edita la información de la categoría a continuación.
            </DialogDescription>
            <div className="mb-4">
              <input
                type="text"
                className="border p-2 rounded w-full mb-4"
                placeholder="Nombre"
                value={newCategoria.nombre}
                onChange={(e) =>
                  setNewCategoria({ ...newCategoria, nombre: e.target.value })
                }
              />
              <input
                type="text"
                className="border p-2 rounded w-full"
                placeholder="Descripción"
                value={newCategoria.descripcion}
                onChange={(e) =>
                  setNewCategoria({ ...newCategoria, descripcion: e.target.value })
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

export default Categorias;
