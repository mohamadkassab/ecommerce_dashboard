


import { Box, IconButton } from '@mui/material';
import React, { useState } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {CrudViewModel} from '@/models/CrudViewModel'




const CrudView: React.FC<CrudViewModel> = ({items, onAdd}) => {
 

    const handleEdit = (id: number) => {
        // Logic to edit the product
        console.log(`Edit product with id: ${id}`);
    };

    const handleDelete = (id: number) => {
        // Logic to delete the product
        
    };

    const handleAddNew = () => {
        // Logic to add a new product
        console.log('Add a new product');
    };

    return (
   

     
        <div className="grid grid-cols-4 gap-4 relative  ">
            <div className=" p-4 rounded text-center flex items-center justify-center">
            <IconButton color="primary" onClick={onAdd}>
                <AddCircleIcon sx={{ fontSize: 40, color:'primary.main' }} ></AddCircleIcon>
            </IconButton>

      
            </div>
            {items?.map(product => (
                <div key={product.id} className="border p-4 text-center">
                    <h2 className="font-bold">{product.name}</h2>
                    <p>{product.description}</p>
                    <button onClick={() => handleEdit(product.id)} className="mt-2 bg-yellow-500 text-white py-1 px-3 rounded">
                        Edit
                    </button>
                    <button onClick={() => handleDelete(product.id)} className="mt-2 bg-red-500 text-white py-1 px-3 rounded">
                        Delete
                    </button>
                </div>
            ))}
        </div>

    );
};

export default CrudView;
