// ProductosPage.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import {
    fetchProductosAsync,
    createProductoAsync,
    updateProductoAsync,
    deleteProductoAsync,
} from '../../../../store/slices/productosSlice';
import { Producto } from '../../../../utils/types';
import { Button } from '@/components/ui/button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';

const ProductosPage = () => {
    const dispatch = useAppDispatch();
    const { productos, loading, error } = useAppSelector((state) => state.producto);

    const [currentProducto, setCurrentProducto] = useState<Producto | null>(null);
    const [newProducto, setNewProducto] = useState<Producto>({
        nombre: '',
        categoriaID: 0,
        proveedorID: 0,
        precioCompra: 0,
        precioVenta: 0,
        stock: 0,
        stockMinimo: 0,
        rutaIMagen: undefined,
        imagen: undefined,
    });
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [showEditModal, setShowEditModal] = useState<boolean>(false);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [productoToDelete, setProductoToDelete] = useState<Producto | null>(null);

    useEffect(() => {
        dispatch(fetchProductosAsync());
    }, [dispatch]);

    const handleSave = async () => {
        setIsSubmitting(true);
        try {
            if (currentProducto) {
                const updatedProducto = await dispatch(
                    updateProductoAsync({
                        id: currentProducto.productoID!,
                        producto: { ...newProducto },
                    })
                ).unwrap();
                toast.success('Producto actualizado correctamente');

                // Limpiar estados
                setCurrentProducto(null);
                setNewProducto({
                    nombre: '',
                    categoriaID: 0,
                    proveedorID: 0,
                    precioCompra: 0,
                    precioVenta: 0,
                    stock: 0,
                    stockMinimo: 0,
                    rutaIMagen: undefined,
                    imagen: undefined,
                });
            } else {
                const createdProducto = await dispatch(createProductoAsync(newProducto)).unwrap();
                toast.success('Producto agregado correctamente');

                // Limpiar estados
                setNewProducto({
                    nombre: '',
                    categoriaID: 0,
                    proveedorID: 0,
                    precioCompra: 0,
                    precioVenta: 0,
                    stock: 0,
                    stockMinimo: 0,
                    rutaIMagen: undefined,
                    imagen: undefined,
                });
            }
            setShowEditModal(false);
        } catch (error: any) {
            const errorMessage = error?.message || 'Error al guardar el producto';
            toast.error(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEdit = (producto: Producto) => {
        setCurrentProducto(producto);
        setNewProducto({ ...producto, imagen: undefined });
        setShowEditModal(true);
    };

    const handleDelete = (producto: Producto) => {
        setProductoToDelete(producto);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = async () => {
        if (productoToDelete) {
            try {
                await dispatch(deleteProductoAsync(productoToDelete.productoID!)).unwrap();
                toast.success('Producto eliminado correctamente');
            } catch (error) {
                toast.error('Error al eliminar el producto');
            } finally {
                setShowDeleteModal(false);
                setProductoToDelete(null);
            }
        }
    };

    // Función para generar un valor único (timestamp) para cache busting
    const getUniqueValue = () => {
        return new Date().getTime();
    };

    // Función para obtener la URL completa de la imagen
    const getImageUrl = (rutaIMagen: string) => {
        if (rutaIMagen.startsWith('http')) {
            // Si `rutaIMagen` ya es una URL completa, la usamos tal cual
            return rutaIMagen;
        } else {
            // Si es una ruta relativa, concatenamos la URL base
            return `https://localhost:7069${rutaIMagen}`;
        }
    };

    return (
        <div className="p-4 sm:p-6 bg-white rounded-lg shadow-md relative mt-6 mx-2 sm:mx-6">
            <ToastContainer />
            <h1 className="text-xl sm:text-2xl font-bold mb-4 text-indigo-800 text-center sm:text-left">
                Gestión de Productos
            </h1>
            <div className="flex justify-center sm:justify-start mb-4">
                <Button
                    onClick={() => {
                        setCurrentProducto(null);
                        setNewProducto({
                            nombre: '',
                            categoriaID: 0,
                            proveedorID: 0,
                            precioCompra: 0,
                            precioVenta: 0,
                            stock: 0,
                            stockMinimo: 0,
                            rutaIMagen: undefined,
                            imagen: undefined,
                        });
                        setShowEditModal(true);
                    }}
                >
                    Agregar Producto
                </Button>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead className="bg-indigo-600 text-white">
                        <tr>
                            <th className="py-2 px-4 text-center">Imagen</th>
                            <th className="py-2 px-4 text-center">Nombre</th>
                            <th className="py-2 px-4 text-center">Categoría</th>
                            <th className="py-2 px-4 text-center">Proveedor</th>
                            <th className="py-2 px-4 text-center">Precio de compra</th>
                            <th className="py-2 px-4 text-center">Precio de venta</th>
                            <th className="py-2 px-4 text-center">Stock</th>
                            <th className="py-2 px-4 text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productos.map((producto) => (
                            <tr key={producto.productoID} className="even:bg-indigo-50">
                                <td className="py-2 px-4">
                                    {producto.rutaIMagen && typeof producto.rutaIMagen === 'string' ? (
                                        <div className="h-16 w-16 sm:h-24 sm:w-24 flex items-center justify-center overflow-hidden">
                                            <img
                                                src={`${getImageUrl(producto.rutaIMagen)}?${getUniqueValue()}`}
                                                alt={producto.nombre}
                                                className="max-h-full max-w-full object-contain"
                                            />
                                        </div>
                                    ) : (
                                        'Sin imagen'
                                    )}
                                </td>
                                <td className="py-2 px-4 text-center">{producto.nombre}</td>
                                <td className="py-2 px-4 text-center">{producto.categoriaID}</td>
                                <td className="py-2 px-4 text-center">{producto.proveedorID}</td>
                                <td className="py-2 px-4 text-center">{producto.precioCompra}</td>
                                <td className="py-2 px-4 text-center">{producto.precioVenta}</td>
                                <td className="py-2 px-4 text-center">{producto.stock}</td>
                                <td className="py-2 px-4">
                                    <Button onClick={() => handleEdit(producto)} className="mb-2 sm:mb-0 sm:mr-2">
                                        Editar
                                    </Button>
                                    <Button onClick={() => handleDelete(producto)} variant="destructive">
                                        Eliminar
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal de edición */}
            {showEditModal && (
                <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
                    <DialogContent className="max-w-lg w-full">
                        <DialogTitle>{currentProducto ? 'Editar Producto' : 'Agregar Producto'}</DialogTitle>
                        <div className="mt-4">
                            <div className="max-h-[70vh] overflow-y-auto">
                                <div className="mb-4">
                                    <input
                                        type="text"
                                        className="border p-2 rounded w-full mb-4"
                                        placeholder="Nombre"
                                        value={newProducto.nombre}
                                        onChange={(e) => setNewProducto({ ...newProducto, nombre: e.target.value })}
                                    />
                                    {/* ... otros campos del formulario ... */}
                                    <input
                                        type="number"
                                        className="border p-2 rounded w-full mb-4"
                                        placeholder="Categoría ID"
                                        value={newProducto.categoriaID}
                                        onChange={(e) =>
                                            setNewProducto({ ...newProducto, categoriaID: Number(e.target.value) })
                                        }
                                    />
                                    <input
                                        type="number"
                                        className="border p-2 rounded w-full mb-4"
                                        placeholder="Proveedor ID"
                                        value={newProducto.proveedorID}
                                        onChange={(e) =>
                                            setNewProducto({ ...newProducto, proveedorID: Number(e.target.value) })
                                        }
                                    />
                                    <input
                                        type="number"
                                        className="border p-2 rounded w-full mb-4"
                                        placeholder="Precio de compra"
                                        value={newProducto.precioCompra}
                                        onChange={(e) =>
                                            setNewProducto({ ...newProducto, precioCompra: Number(e.target.value) })
                                        }
                                    />
                                    <input
                                        type="number"
                                        className="border p-2 rounded w-full mb-4"
                                        placeholder="Precio de venta"
                                        value={newProducto.precioVenta}
                                        onChange={(e) =>
                                            setNewProducto({ ...newProducto, precioVenta: Number(e.target.value) })
                                        }
                                    />
                                    <input
                                        type="number"
                                        className="border p-2 rounded w-full mb-4"
                                        placeholder="Stock"
                                        value={newProducto.stock}
                                        onChange={(e) =>
                                            setNewProducto({ ...newProducto, stock: Number(e.target.value) })
                                        }
                                    />
                                    <input
                                        type="number"
                                        className="border p-2 rounded w-full mb-4"
                                        placeholder="Stock mínimo"
                                        value={newProducto.stockMinimo}
                                        onChange={(e) =>
                                            setNewProducto({ ...newProducto, stockMinimo: Number(e.target.value) })
                                        }
                                    />
                                    <input
                                        type="file"
                                        className="border p-2 rounded w-full mb-4"
                                        onChange={(e) =>
                                            setNewProducto({
                                                ...newProducto,
                                                imagen: e.target.files ? e.target.files[0] : undefined,
                                            })
                                        }
                                    />
                                    {/* Mostrar imagen actual */}
                                    {currentProducto?.rutaIMagen && typeof currentProducto.rutaIMagen === 'string' && (
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Imagen Actual:
                                            </label>
                                            <div className="h-48 w-48 flex items-center justify-center overflow-hidden">
                                                <img
                                                    src={`${getImageUrl(currentProducto.rutaIMagen)}?${getUniqueValue()}`}
                                                    alt={currentProducto.nombre}
                                                    className="max-h-full max-w-full object-contain"
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setShowEditModal(false)}>
                                Cancelar
                            </Button>
                            <Button onClick={handleSave} disabled={isSubmitting}>
                                {isSubmitting ? 'Guardando...' : 'Guardar'}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}

            {/* Modal de confirmación de eliminación */}
            {showDeleteModal && (
                <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
                    <DialogContent className="max-w-md w-full">
                        <DialogTitle>Confirmar Eliminación</DialogTitle>
                        <div className="mt-4">
                            <p>¿Estás seguro de que deseas eliminar el producto "{productoToDelete?.nombre}"?</p>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setShowDeleteModal(false)}>
                                Cancelar
                            </Button>
                            <Button onClick={handleConfirmDelete} variant="destructive">
                                Eliminar
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
};

export default ProductosPage;
