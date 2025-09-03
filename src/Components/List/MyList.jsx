import React, { useState } from 'react'
import Table from 'react-bootstrap/Table';
import Badge from 'react-bootstrap/Badge';
import Stack from 'react-bootstrap/Stack';
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";

function MyList({ products, setProducts }) {
    //de ht3ml delete ll row b el on click ele 3la el delete icon
    const deleteProduct = (index) => {
        const updatedProducts = products.filter((product, i) => i !== index);
        setProducts(updatedProducts);
    }
    
    //de 3shan a3rf ana wa2f 3la anhe row (null means no row is being edited)
    const [editingIndex, setEditingIndex] = useState(null);
    
    // de state t3ml save ll formData
    const [editForm, setEditForm] = useState({
        name: '',
        price: '',
        isFreeShipping: false
    });

    //de htt3ml lma ados 3la el edit icon
    const startEdit = (index, product) => {
        setEditingIndex(index); // 3shan a7dd anhe raw ele ana wa2f 3leh
        setEditForm({ //3shan a3ml load ll currant data 
            name: product.name,
            price: product.price,
            isFreeShipping: product.isFreeShipping
        });
    }

    //de btt3ml lma ados 3la el save button
    const saveEdit = (index) => {
        // de 3shan a handle lw mafesh data da5la
        if (!editForm.name.trim() || !editForm.price) {
            alert('Please fill in all required fields (Name and Price)');
            return;
        }
        const updatedProducts = [...products];//h3ml nos5a mn el array 
        updatedProducts[index] = editForm;//de 3shan t3ml replace ll data bta3t el raw 
        setProducts(updatedProducts);//de ht3ml update ll data
        setEditingIndex(null);//this will exit the edit mode
        setEditForm({ name: '', price: '', isFreeShipping: false }); //3shan t3ml reset ll edit form
    }

    //de btt3ml lma ados 3la el cancel button
    const cancelEdit = () => {
        setEditingIndex(null);
        setEditForm({ name: '', price: '', isFreeShipping: false });
    }

    // de bt3ml save ll data that i entered it
    const handleEditInputChange = (e) => {
        if (e.target.name === 'isFreeShipping') {
            //this 3shan el e tt3ml 3la el checked not el value
            setEditForm({ ...editForm, [e.target.name]: e.target.checked });
        } else {
            //this 3shan el e tt3ml 3la el value not the checked
            setEditForm({ ...editForm, [e.target.name]: e.target.value });
        }
    }
    
    return (
        <>
            <div>
                <h1 className='text-center'>ProductList</h1>
                <Table striped bordered hover className='text-center' style={{width : "50%", margin: "2% auto"}}>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Product Name</th>
                            <th>Product Price</th>
                            <th>Free Shipping</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr key={index}>
                            <td>{index + 1}</td>
                            
                            {/* Product Name Column - Shows input field when editing, normal text when not */}
                            <td>
                                {editingIndex === index ? (
                                    <input
                                        type="text"
                                        name="name"
                                        value={editForm.name}
                                        onChange={handleEditInputChange}
                                        className="form-control"
                                    />
                                ) : (
                                    product.name
                                )}
                            </td>
                            
                            {/* Product Price Column - Shows number input when editing, price with $ when not */}
                            <td>
                                {editingIndex === index ? (
                                    <input
                                        type="number"
                                        name="price"
                                        value={editForm.price}
                                        onChange={handleEditInputChange}
                                        className="form-control"
                                    />
                                ) : (
                                    <>{product.price}<span>$</span></>
                                )}
                            </td>
                            
                            {/* Free Shipping Column - Shows checkbox when editing, badge when not */}
                            <td>
                                {editingIndex === index ? (
                                    <input
                                        type="checkbox"
                                        name="isFreeShipping"
                                        checked={editForm.isFreeShipping}
                                        onChange={handleEditInputChange}
                                        className="form-check-input"
                                    />
                                ) : (
                                    product.isFreeShipping ? (
                                        <Badge bg="success">Free Shipping</Badge>
                                    ) : (
                                        <Badge bg="danger">No Free Shipping</Badge>
                                    )
                                )}
                            </td>
                            
                            {/* Action Column - Shows Save/Cancel buttons when editing, Edit/Delete icons when not */}
                            <td>
                                <div className='d-flex flex-row justify-content-around'>
                                    {editingIndex === index ? (
                                        // When editing: show Save and Cancel buttons
                                        <>
                                            <button 
                                                className="btn btn-success btn-sm"
                                                onClick={() => saveEdit(index)}
                                            >
                                                Save
                                            </button>
                                            <button 
                                                className="btn btn-secondary btn-sm"
                                                onClick={cancelEdit}
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    ) : (
                                        // When not editing: show Edit and Delete icons
                                        <>
                                            <CiEdit 
                                                size={"30"} 
                                                color='#1680b1ff'
                                                onClick={() => startEdit(index, product)}
                                                style={{cursor: "pointer"}}
                                            />
                                            <MdDeleteForever
                                                size={"30"} 
                                                color='#9b1b1bff' 
                                                onClick={() => deleteProduct(index)}
                                                style={{cursor: "pointer"}}
                                            />
                                        </>
                                    )}
                                </div>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </>
    )
}

export default MyList