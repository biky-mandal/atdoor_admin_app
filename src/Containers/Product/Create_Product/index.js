import React, { useState, useEffect } from 'react';
import Layout from '../../../Components/Layout';
import './style.css';
import { Breadcrumb } from 'react-bootstrap';
import { TextField, Button } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import { NavLink } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { MdCloudUpload } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { create_product_action } from '../../../Actions';
import Loading from '../../../Components/Loader/index';

/**
* @author
* @function Create_Product
**/

const Create_Product = (props) => {
    const dispatch = useDispatch();
    const category = useSelector(state => state.category);
    const product = useSelector(state => state.product);
    // console.log(category.categories)

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [amt_o_price, setAmtOprice] = useState('');
    const [amt_s_price, setAmtSprice] = useState('');
    const [qty_o_price, setQtyOprice] = useState('');
    const [qty_s_price, setQtySprice] = useState('');
    const [Category, setCategory] = useState('');
    const [stock_amt, setStock_amt] = useState('');
    const [stock_qty, setStock_qty] = useState('');
    const [unit, setUnit] = useState('');
    const [qtyunit, setQtyUnit] = useState('');
    const [base_quantity, setBase_quantity] = useState('');
    // const [productPictures, setProductPictures] = useState([]);

    // const handleProductPicture = (e) => {
    //     setProductPictures([
    //         ...productPictures,
    //         e.target.files[0]
    //     ]);
    // }

    // console.log(productPictures)

    const Allcategories = category.categories
    // const wrapper = React.createRef();

    const handleChange = (event) => {
        setCategory(event.target.value);
    };

    const handleUnitChange = (event) => {
        setUnit(event.target.value);
    };

    const handleQtyChange = (event) => {
        setQtyUnit(event.target.value);
    };

    const [files, setFiles] = useState([]);
    // console.log(files);


    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        onDrop: acceptedFiles => {
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));
        }
    });
    const thumbs = files.map(file => (
        <div className="thumb" key={file.name}>
            <div className="thumbInner">
                <img
                    className="img"
                    src={file.preview}
                />
            </div>
        </div>
    ));

    useEffect(() => () => {
        // Make sure to revoke the data uris to avoid memory leaks
        files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);

    const units = [
        {
            value: "kg"
        },
        {
            value: "gram"
        }
    ];
    const qty_units = [
        {
            value: "Pcs"
        },
        {
            value: "Bags"
        }
    ];

    const CreateProduct_Btn_Clicked = () => {
        // const new_product = {
        //     'name': name,
        //     'description':description,
        //     'original_price': o_price,
        //     'selling_price': s_price,
        //     'stock_amount': stock_amt,
        //     'stock_quantity': stock_qty,
        //     'category': Category,
        //     'productPicture': productPictures[0].name
        // };

        const new_product = new FormData();
        // console.log(typeof new_product);

        new_product.append('name', name);
        new_product.append('description', description);
        new_product.append('amt_original_price', amt_o_price);
        new_product.append('amt_selling_price', amt_s_price);
        new_product.append('qty_original_price', qty_o_price);
        new_product.append('qty_selling_price', qty_s_price);
        new_product.append('stock_amount', stock_amt);
        new_product.append('stock_quantity', stock_qty);
        new_product.append('category', Category);
        new_product.append('unit', unit);
        new_product.append('qtyunit', qtyunit);
        new_product.append('base_quantity', base_quantity);

        for (let pic of files) {
            new_product.append('productPicture', pic)
        }
        dispatch(create_product_action(new_product));
    }


    return (
        <>
            <Layout sidebar>
                {product.loading ? <Loading /> : null}
                <div className="cr-0-cate">
                    <div className="brd-cumb-div">
                        <Breadcrumb>
                            <Breadcrumb.Item href='http://localhost:9000/' className="brd-cumb">Dashboard</Breadcrumb.Item>
                            <Breadcrumb.Item href='http://localhost:9000/product/fetch' className="brd-cumb">allproduct</Breadcrumb.Item>
                            <Breadcrumb.Item className="brd-cumb" active>addproduct</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <div className="h-lbl1-div">
                        <label className="h-lbl1">Add New Product</label>
                    </div>
                    <div className="cancel-cat-btn">
                        <NavLink to={'/product/fetch'}>Cancel</NavLink>
                    </div>
                    <div className="cr-1-div">
                        <TextField
                            label="Product Name"
                            variant="outlined"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            className="nameinput"
                        />
                        <TextField
                            label="Description"
                            variant="outlined"
                            multiline={true}
                            rows={9}
                            className="desinput"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                    </div>
                    {/*  */}
                    <div className="cr-11-div">
                        <div className="cr-3-1-div">
                            <label className="h-price-lbl">Organize</label>
                        </div>
                        <TextField
                            id="outlined-select-currency"
                            select
                            label="Select Category"
                            value={Category}
                            onChange={handleChange}
                            variant="outlined"
                            className="cat-input"
                        >
                            {Allcategories.map((option) => (
                                <MenuItem key={option._id} value={option._id}>
                                    {option.name}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            label="Base Amount"
                            variant="outlined"
                            type="Number"
                            value={base_quantity}
                            onChange={e => setBase_quantity(e.target.value)}
                            className="cat-input"
                        />
                    </div>
                    {/* **********Picture Section********************** */}
                    <div className="cr-2-div">
                        <div className="cr-3-1-div">
                            <label className="h-price-lbl">Pictures</label>
                        </div>
                        <section className="container">
                            <div {...getRootProps({ className: 'dropzone' })}>
                                <input {...getInputProps()} />
                                <label className="upload-logo">
                                    <MdCloudUpload />
                                </label>
                                <label className="upload-lbl">
                                    Upload Pictures
                            </label>
                            </div>
                            <aside className="thumbsContainer">
                                {thumbs}
                            </aside>
                        </section>
                    </div>



                    {/* *************************************************** */}



                    <div className="cr-3-4-main-div">
                        {/* *********** */}
                        <div className="cr-3-div">
                            <div className="cr-3-1-div">
                                <label className="h-price-lbl">For Amount Section</label>
                                <TextField
                                    variant="outlined"
                                    select
                                    label="Select Unit"
                                    value={unit}
                                    onChange={handleUnitChange}
                                    className="units"
                                >
                                    {units.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.value}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </div>
                            <div className="cr-3-2-div">
                                <TextField
                                    label="Original Price"
                                    variant="outlined"
                                    type="Number"
                                    value={amt_o_price}
                                    onChange={e => setAmtOprice(e.target.value)}
                                    className="priceinput"
                                />
                                {
                                    unit === '' ? <label className="unit-2nd-lbl">/ Unit</label> : <label className="unit-2nd-lbl">/ {unit}</label>
                                }
                                <TextField
                                    label="Selling_Price"
                                    variant="outlined"
                                    value={amt_s_price}
                                    type="Number"
                                    onChange={e => setAmtSprice(e.target.value)}
                                    className="priceinput"
                                />
                                {
                                    unit === '' ? <label className="unit-2nd-lbl">/ Unit</label> : <label className="unit-2nd-lbl">/ {unit}</label>
                                }
                                <TextField
                                    label="Stock (In Amt)"
                                    variant="outlined"
                                    type="Number"
                                    value={stock_amt}
                                    onChange={e => setStock_amt(e.target.value)}
                                    className="Stock-am-input"
                                />
                                {
                                    unit === '' ? <label className="unit-2nd-lbl">Unit</label> : <label className="unit-2nd-lbl">{unit}</label>
                                }
                            </div>
                        </div>
                        {/* ********************** For quntity Sextion************************* */}
                        <div className="cr-4-div">
                            <div className="cr-3-1-div">
                                <label className="h-price-lbl">For Quantity Section</label>
                                <TextField
                                    id="outlined-select-currency"
                                    select
                                    label="Select Unit"
                                    value={qtyunit}
                                    onChange={handleQtyChange}
                                    variant="outlined"
                                    className="units"
                                >
                                    {qty_units.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.value}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </div>
                            <div className="cr-3-2-div">
                                <TextField
                                    label="Original Price"
                                    variant="outlined"
                                    type="Number"
                                    value={qty_o_price}
                                    onChange={e => setQtyOprice(e.target.value)}
                                    className="priceinput"
                                />
                                {
                                    qtyunit === '' ? <label className="unit-2nd-lbl">/ Unit</label> : <label className="unit-2nd-lbl">/ {qtyunit}</label>
                                }
                                <TextField
                                    label="Selling_Price"
                                    variant="outlined"
                                    value={qty_s_price}
                                    type="Number"
                                    onChange={e => setQtySprice(e.target.value)}
                                    className="priceinput"
                                />
                                {
                                    qtyunit === '' ? <label className="unit-2nd-lbl">/ Unit</label> : <label className="unit-2nd-lbl">/ {qtyunit}</label>
                                }
                                <TextField
                                    label="Stock (In Qty)"
                                    variant="outlined"
                                    type="Number"
                                    value={stock_qty}
                                    onChange={e => setStock_qty(e.target.value)}
                                    className="Stock-qt-input"
                                />
                                {
                                    qtyunit === '' ? <label className="unit-2nd-lbl">Unit</label> : <label className="unit-2nd-lbl">{qtyunit}</label>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="cr-pr-btn-div">
                        <Button variant="outlined" onClick={CreateProduct_Btn_Clicked} className="cr-pr-btn" color="primary">
                            Create Product
                        </Button>
                    </div>
                </div>
            </Layout>
        </>
    )

}

export default Create_Product