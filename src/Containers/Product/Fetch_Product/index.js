import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { delete_product_action, import_product_action, export_product_action, update_product_action } from '../../../Actions';
import Layout from '../../../Components/Layout';
import './style.css';
import { Breadcrumb, Table, Modal } from 'react-bootstrap';
import { TextField } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { generatePublicUrl } from '../../../urlConfig';
import { BiExport, BiImport } from "react-icons/bi";

/**
* @author
* @function Fetch_Product
**/

const Fetch_Product = (props) => {

    // Here i get the product and category from the redux Store.(That is Fetched from the backend)
    const product = useSelector(state => state.product);
    const category = useSelector(state => state.category);

    // Creating a hook for dispatch to dispatch an action. I import it from react-redux.
    const dispatch = useDispatch();


    // Local States

    // Which is an array of product.
    const [productState, setProductState] = useState([]);

    // States for modal.
    const [open, setOpen] = useState(false);
    const [open1, set1Open] = useState(false);
    const [open2, set2Open] = useState(false)

    // States thats are going to update
    const [up_amt_original_price, set_Up_amt_original_price] = useState('');
    const [up_amt_selling_price, set_Up_amt_selling_price] = useState('');
    const [up_qty_original_price, set_Up_qty_original_price] = useState('');
    const [up_qty_selling_price, set_Up_qty_selling_price] = useState('');
    const [up_description, set_UpDescription] = useState('');
    const [unit, setUnit] = useState('');
    const [qtyunit, setQtyUnit] = useState('');
    const [name, setName] = useState('');
    const [stock_amount, setStock_amount] = useState('');
    const [stock_quantity, setStock_quantity] = useState('');
    const [stock_am_to_be_imported_or_exported, set_stock_am_to_be_imported_or_exported] = useState('');
    const [stock_qty_to_be_imported_or_exported, set_stock_qty_to_be_imported_or_exported] = useState('');

    useEffect(() => {
        // from redux store I save some data(Which i needed) to my local state using map function.
        let productState = product.products
        // then again set the productState with select variable which will be use in select perpous.
        setProductState(
            productState.map(prodct => {
                return {
                    select: false,
                    id: prodct._id,
                    name: prodct.name,
                    stock_amount: prodct.stock_amount,
                    stock_quantity: prodct.stock_quantity,
                    amt_original_price: prodct.amt_original_price,
                    amt_selling_price: prodct.amt_selling_price,
                    qty_original_price: prodct.qty_original_price,
                    qty_selling_price: prodct.qty_selling_price,
                    unit: prodct.unit,
                    qtyunit: prodct.qtyunit,
                    category: prodct.category,
                    description: prodct.description,
                    productPictures: prodct.productPictures
                }
            })
        )
    }, []);

    // When i Select a product then this function runs and render the buttons
    // Like rendering Delete Button and Update Button.
    const renderButtons = () => {
        if (productState) {
            let truth = 0;

            // Here i Use it know how many of products are selected.
            productState.map((p) => {
                if (p.select === true) {
                    truth++;
                }
            });
            // If only one Product is selected then I render the buttons otherwise not.
            if (truth === 1) {
                return (
                    <div className="btn-u-d-div1">
                        <button className="Import-btn" onClick={import_Btn_Clicked}><BiImport /></button>
                        <button className="Export-btn" onClick={export_Btn_Clicked}><BiExport /></button>
                        <button className="Delete-btn" onClick={delete_Btn_Clicked}>Delete</button>
                        <button className="Update-btn" onClick={update_Btn_Clicked}>Update</button>
                    </div>
                );
            }
        }
    }
    // When delete button is clicked this fuction will run.
    const delete_Btn_Clicked = () => {
        // console.log("Delete Button Clicked!")
        // this map is for getting he name of selected product.
        if (window.confirm("Are You Sure?")) {
            productState.map(f_product => {
                if (f_product.select === true) {
                    dispatch(delete_product_action(f_product.name))
                }
            })
        }
    }

    const update_Btn_Clicked = () => {
        productState.map(f_product => {
            if (f_product.select === true) {
                set_Up_amt_original_price(f_product.amt_original_price);
                set_Up_amt_selling_price(f_product.amt_selling_price);
                set_Up_qty_original_price(f_product.qty_original_price);
                set_Up_qty_selling_price(f_product.qty_selling_price);
                set_UpDescription(f_product.description);
                setUnit(f_product.unit);
                setQtyUnit(f_product.qtyunit);
                setName(f_product.name);
                // dispatch(delete_product_action(f_product.name))
            }
        })
        handleModalOpen();
    }

    const productUpdate = () => {
        handleModalClose();
        // Let's dispatch
        dispatch(update_product_action(
            // As a parameter we pass the things from local state.
            name,
            unit,
            qtyunit,
            up_amt_original_price,
            up_amt_selling_price,
            up_qty_original_price,
            up_qty_selling_price,
            up_description
        ))
    }

    const import_Btn_Clicked = () => {
        productState.map(f_product => {
            if (f_product.select === true) {
                setStock_amount(f_product.stock_amount);
                setStock_quantity(f_product.stock_quantity);
                setUnit(f_product.unit);
                setQtyUnit(f_product.qtyunit);
                setName(f_product.name);
                // dispatch(delete_product_action(f_product.name))
            }
        })
        handleModal1Open();
    }

    const export_Btn_Clicked = () => {
        productState.map(f_product => {
            if (f_product.select === true) {
                setStock_amount(f_product.stock_amount);
                setStock_quantity(f_product.stock_quantity);
                setUnit(f_product.unit);
                setQtyUnit(f_product.qtyunit);
                setName(f_product.name);
                // dispatch(delete_product_action(f_product.name))
            }
        })
        handleModal2Open();
    }

    // Importing Products
    const productImport = () => {
        // closing the modal
        handleModal1Close();

        let new_stock;

        if (stock_amount === '') {
            new_stock = parseInt(stock_quantity, 10) + parseInt(stock_qty_to_be_imported_or_exported, 10);
        } if (stock_quantity === '') {
            new_stock = parseInt(stock_amount, 10) + parseInt(stock_am_to_be_imported_or_exported, 10);
        }

        // Let's dispatch
        dispatch(import_product_action(
            // As a parameter we pass the things from local state.
            new_stock.toString(),
            unit,
            qtyunit,
            name
        ))
    }

    // Exporting Product
    const productExport = () => {
        // closing the modal
        handleModal2Close();
        // Let's dispatch
        let new_stock;

        if (stock_amount === '0' || stock_quantity === '0') {
            // Check for Product Availability.
            alert('This Product is Not Available..')
        } else {
            // If the Product is available
            if (stock_amount === '') {
                // agian checking for that exporting amount is lesser than the current amount or not.
                // Suppose we have 10kg stock and we want to export 11 kg then it will not possible.
                if (parseInt(parseInt(stock_quantity, 10) >= stock_qty_to_be_imported_or_exported, 10)) {
                    new_stock = parseInt(stock_quantity, 10) - parseInt(stock_qty_to_be_imported_or_exported, 10);

                    // Let's dispatch
                    dispatch(export_product_action(
                        // As a parameter we pass the things from local state.
                        new_stock.toString(), // we have to convert it to string as the operation happend in integer form.
                        unit,
                        qtyunit,
                        name
                    ))
                } else {
                    alert('Exporting Amount must be less or equal to Stock.')
                }
            } if (stock_quantity === '') {
                if (parseInt(parseInt(stock_amount, 10) >= stock_qty_to_be_imported_or_exported, 10)) {
                    new_stock = parseInt(stock_amount, 10) - parseInt(stock_qty_to_be_imported_or_exported, 10);

                    // Let's dispatch
                    dispatch(export_product_action(
                        // As a parameter we pass the things from local state.
                        new_stock.toString(), // we have to convert it to string as the operation happend in integer form.
                        unit,
                        qtyunit,
                        name
                    ))
                } else {
                    alert('Exporting Amount must be less or equal to Stock.')
                }
            }
        }
    }


    // For Management of modals. *************************
    const handleModalOpen = () => {
        setOpen(true);
    };

    const handleModalClose = () => {
        setOpen(false);
    };

    const handleModal1Open = () => {
        set1Open(true);
    };

    const handleModal1Close = () => {
        set1Open(false);
    };

    const handleModal2Open = () => {
        set2Open(true);
    };

    const handleModal2Close = () => {
        set2Open(false);
    };
    // ***************************************************



    return (
        <Layout sidebar>
            <div className="ftc-cate">
                <div className="brd-cumb-div">
                    <Breadcrumb>
                        <Breadcrumb.Item href='http://localhost:9000/' className="brd-cumb">Dashboard</Breadcrumb.Item>
                        <Breadcrumb.Item className="brd-cumb" active>allProduct</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="h-lbl-div">
                    <label className="h-lbl">All Products</label>
                </div>
                {/*  */}
                {
                    renderButtons()
                }
                {/*  */}
                <div className="crte-cat-btn">
                    <NavLink to={'/product/create'}>Create New</NavLink>
                </div>
                <div className="ftc-main-div1">
                    <Table responsive="md">
                        <thead>
                            <tr>
                                <th></th>
                                <th></th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Selling Price</th>
                                <th>Category</th>
                                <th>Stock</th>
                                <th>Inventory</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                productState.map((prodct) => (
                                    <tr key={prodct.id} className="table-row">
                                        <td>
                                            <input
                                                className="option-input radio"
                                                type="checkbox"
                                                checked={prodct.select}
                                                value={prodct.name}
                                                onChange={
                                                    (e) => {
                                                        let checked = e.target.checked;
                                                        setProductState(productState.map((data) => {
                                                            if (prodct.id === data.id) {
                                                                data.select = checked;
                                                            }
                                                            return data
                                                        })
                                                        );
                                                    }
                                                }
                                            />
                                        </td>
                                        <td>
                                            {
                                                <img className="product-img-section" src={generatePublicUrl(prodct.productPictures[0].img)} alt="" />
                                            }
                                        </td>
                                        <td>{prodct.name}</td>
                                        <td>
                                            {
                                                prodct.amt_original_price === '' ? prodct.qty_original_price + 'Rs' + '/' + prodct.qtyunit :
                                                    prodct.amt_original_price + 'Rs' + '/' + prodct.unit
                                            }
                                        </td>
                                        <td>
                                            {
                                                prodct.amt_selling_price === '' ? prodct.qty_selling_price + 'Rs' + '/' + prodct.qtyunit :
                                                    prodct.amt_selling_price + 'Rs' + '/' + prodct.unit
                                            }
                                        </td>
                                        <td>
                                            {
                                                category.categories.map(cat => {
                                                    if (cat._id === prodct.category) {
                                                        return cat.name
                                                    }
                                                })
                                            }
                                        </td>
                                        <td>
                                            {
                                                prodct.stock_amount === '' ? prodct.stock_quantity + prodct.qtyunit : prodct.stock_amount + prodct.unit
                                            }
                                        </td>
                                        <td>
                                            {
                                                parseInt(prodct.stock_amount, 10) === 0 ? <label className="o-o-s">OUT OF STOCK</label> : null
                                            }
                                            {
                                                parseInt(prodct.stock_quantity, 10) === 0 ? <label className="o-o-s">OUT OF STOCK</label> : null
                                            }
                                            {
                                                parseInt(prodct.stock_amount, 10) > 0 && parseInt(prodct.stock_amount, 10) < 10 ? <label className="l">LIMITED</label> : null
                                            }
                                            {
                                                parseInt(prodct.stock_quantity, 10) > 0 && parseInt(prodct.stock_quantity, 10) < 10 ? <label className="l">LIMITED</label> : null
                                            }
                                            {
                                                parseInt(prodct.stock_amount, 10) >= 10 ? <label className="i-s">IN STOCK</label> : null
                                            }
                                            {
                                                parseInt(prodct.stock_quantity, 10) >= 10 ? <label className="i-s"> IN STOCK</label> : null
                                            }
                                        </td>
                                    </tr>
                                ))
                            }

                        </tbody>
                    </Table>
                </div>
                {/* ************************This Modal is for update button************************** */}
                <Modal size="lg" className="modal" show={open} onHide={handleModalClose} animation={true}>
                    <Modal.Body className="product-modal-body">
                        {
                            up_amt_original_price === '' ?
                                <div className="update-set">
                                    <TextField
                                        label="Update Original Price(Qty)"
                                        variant="outlined"
                                        className="price-inpt"
                                        value={up_qty_original_price}
                                        onChange={e => set_Up_qty_original_price(e.target.value)}
                                    />
                                    <TextField
                                        label="Update Selling Price(Qty)"
                                        variant="outlined"
                                        className="price-inpt"
                                        value={up_qty_selling_price}
                                        onChange={e => set_Up_qty_selling_price(e.target.value)}
                                    />
                                    <TextField
                                        label="Update Description"
                                        variant="outlined"
                                        multiline={true}
                                        rows={6}
                                        className="des-inpt"
                                        value={up_description}
                                        onChange={e => set_UpDescription(e.target.value)}
                                    />
                                    <div className="tag-div">
                                        <label className="lbl-tag">{name}</label>
                                        <label className="lbl-tag">{qtyunit}</label>
                                    </div>
                                </div>
                                :
                                <div className="update-set">
                                    <TextField
                                        label="Update Original Price(Amt)"
                                        variant="outlined"
                                        className="price-inpt"
                                        value={up_amt_original_price}
                                        onChange={e => set_Up_amt_original_price(e.target.value)}
                                    />
                                    <TextField
                                        label="Update Selling Price(Amt)"
                                        variant="outlined"
                                        className="price-inpt"
                                        value={up_amt_selling_price}
                                        onChange={e => set_Up_amt_selling_price(e.target.value)}
                                    />
                                    <TextField
                                        label="Update Description"
                                        variant="outlined"
                                        multiline={true}
                                        rows={6}
                                        className="des-inpt"
                                        value={up_description}
                                        onChange={e => set_UpDescription(e.target.value)}
                                    />
                                    <div className="tag-div">
                                        <label className="lbl-tag">{name}</label>
                                        <label className="lbl-tag">{unit}</label>
                                    </div>
                                </div>
                        }
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="Delete-btn" onClick={handleModalClose}>
                            Close
                        </button>
                        <button className="Update-btn" onClick={productUpdate}>
                            Update
                        </button>
                    </Modal.Footer>
                </Modal>
                {/* *****************This Modal is for import products******************** */}
                <Modal className="modal" show={open1} onHide={handleModal1Close} animation={true}>
                    <Modal.Body className="product-modal-body">
                        {
                            stock_amount === '' ?
                                <div className="update-set">
                                    <TextField
                                        label="Stock Quantity to be Imported"
                                        variant="outlined"
                                        className="price-inpt"
                                        value={stock_qty_to_be_imported_or_exported}
                                        onChange={e => set_stock_qty_to_be_imported_or_exported(e.target.value)}
                                    />
                                    <div className="tag-div">
                                        <label className="lbl-tag">{name}</label>
                                        <label className="lbl-tag">{qtyunit}</label>
                                    </div>
                                </div>
                                :
                                <div className="update-set">
                                    <TextField
                                        label="Stock Amount to be Imported"
                                        variant="outlined"
                                        className="price-inpt"
                                        value={stock_am_to_be_imported_or_exported}
                                        onChange={e => set_stock_am_to_be_imported_or_exported(e.target.value)}
                                    />
                                    <div className="tag-div">
                                        <label className="lbl-tag">{name}</label>
                                        <label className="lbl-tag">{unit}</label>
                                    </div>
                                </div>
                        }
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="Delete-btn" onClick={handleModal1Close}>
                            Close
                        </button>
                        <button className="Update-btn" onClick={productImport}>
                            Import
                        </button>
                    </Modal.Footer>
                </Modal>

                {/* **************************This modal is for export products ***************************** */}

                <Modal className="modal" show={open2} onHide={handleModal2Close} animation={true}>
                    <Modal.Body className="product-modal-body">
                        {
                            stock_amount === '' ?
                                <div className="update-set">
                                    <TextField
                                        label="Quantity to be Exported"
                                        variant="outlined"
                                        className="price-inpt"
                                        value={stock_qty_to_be_imported_or_exported}
                                        onChange={e => set_stock_qty_to_be_imported_or_exported(e.target.value)}
                                    />
                                    <div className="tag-div">
                                        <label className="lbl-tag">{name}</label>
                                        <label className="lbl-tag">{qtyunit}</label>
                                    </div>
                                </div>
                                :
                                <div className="update-set">
                                    <TextField
                                        label="Amount to be Exported"
                                        variant="outlined"
                                        className="price-inpt"
                                        value={stock_am_to_be_imported_or_exported}
                                        onChange={e => set_stock_am_to_be_imported_or_exported(e.target.value)}
                                    />
                                    <div className="tag-div">
                                        <label className="lbl-tag">{name}</label>
                                        <label className="lbl-tag">{unit}</label>
                                    </div>
                                </div>
                        }
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="Delete-btn" onClick={handleModal2Close}>
                            Close
                        </button>
                        <button className="Update-btn" onClick={productExport}>
                            Export
                        </button>
                    </Modal.Footer>
                </Modal>
            </div>
        </Layout>
    )

}

export default Fetch_Product