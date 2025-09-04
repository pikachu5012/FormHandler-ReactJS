import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "./MyForm.module.css"

function MyForm({products, setProducts}) {
    const [formData, setFormData] = useState({
        name: "", price: "", quantity: "", category: "", isFreeShipping: false
    }); 
    console.log(formData);
    const formInputHandler = (e) => {
        if(e.target.name === "isFreeShipping"){
            setFormData({...formData, [e.target.name] : e.target.checked});
        } else {
            setFormData({...formData, [e.target.name] : e.target.value});
        }
    };
    const addNewProduct = (e) => {
        e.preventDefault();//this will stop the reload
        setProducts([...products, formData]);
        console.log(products)
    };
    return (
        <>
        <div style={{ width : "50%", margin:"5% auto"}}>
            <h1 className='text-center'>ProductForm</h1>
            <Form onSubmit={addNewProduct}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control
                        type="text" 
                        placeholder="Enter a Name"
                        name='name' 
                        value={formData.name} 
                        onChange={formInputHandler}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPrice">
                    <Form.Label>Product Price</Form.Label>
                    <Form.Control
                        type="number" 
                        placeholder="Enter a Price"
                        name="price"
                        value={formData.price} 
                        onChange={formInputHandler}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicQuantity">
                    <Form.Label>Product Quantity</Form.Label>
                    <Form.Control
                        type="number" 
                        placeholder="Enter a Quantity"
                        name="quantity"
                        value={formData.quantity} 
                        onChange={formInputHandler}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCategory">
                    <Form.Label>Product Category</Form.Label>
                    <Form.Control
                        type="text" 
                        placeholder="Enter a Category"
                        name="category"
                        value={formData.category} 
                        onChange={formInputHandler}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check
                        type="checkbox" 
                        label="Free Shipping"
                        name='isFreeShipping'
                        checked={formData.isFreeShipping}
                        onChange={formInputHandler}
                    />
                </Form.Group>
                <Button variant="dark" type="submit">
                    Add Product
                </Button>
            </Form>
        </div>
        </>
    )
}

export default   MyForm