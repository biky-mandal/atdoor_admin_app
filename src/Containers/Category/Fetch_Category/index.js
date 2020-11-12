import React, { useEffect, useState } from 'react'
import './style.css'
import Layout from '../../../Components/Layout'
import { Breadcrumb, Table, Modal } from 'react-bootstrap';
import { TextField } from '@material-ui/core';
import { NavLink, Redirect } from 'react-router-dom';
import { FiPlusCircle } from "react-icons/fi";
import { useDispatch, useSelector } from 'react-redux';
import { delete_category_action, update_category_action } from '../../../Actions/index';
import Loading from '../../../Components/Loader';

/**
* @author
* @function Fetch_Category
**/

const Fetch_Category = (props) => {
    const category = useSelector(state => state.category);
    const dispatch = useDispatch();

    const [categoryState, setCategoryState] = useState([]);
    const [description, setDescription] = useState('');

    // State for modal.
    const [open, setOpen] = useState(false);

    // For Management of modals. *************************
    const handleModalOpen = () => {
        setOpen(true);
    };

    const handleModalClose = () => {
        setOpen(false);
    };
    // ***************************************************

    useEffect(() => {
        let categoryState = category.categories
        setCategoryState(
            categoryState.map(cate => {
                return {
                    select: false,
                    id: cate._id,
                    name: cate.name,
                    description: cate.description
                };
            })
        );
    }, []);

    // This function is for rendering Buttons..Update and delete.
    const renderButtons = () => {
        if (categoryState) {
            // console.log(categoryState);
            let truth = 0, flse = 0;
            // Thrugh map function i iterate through the categoryState and save the true or false value 
            categoryState.map((c) => {
                if (c.select === true) {
                    truth++;
                    // console.log(c);
                } else {
                    flse++;
                }
            });
            // console.log(`True: ${truth} & false: ${flse}`);
            //  Conditionally Rendered
            if (truth === 1) {
                return (
                    <div className="btn-u-d-div">
                        <button className="Delete-btn" onClick={delete_Btn_Clicked}>Delete</button>
                        <button className="Update-btn" onClick={update_Btn_Clicked}>Update</button>
                    </div>
                );
            }
        }
    }

    // When user perform delete Operations.
    const delete_Btn_Clicked = () => {
        console.log("Delete Button Clicked!")
        console.log(categoryState);

        categoryState.map(f_cat => {
            if (f_cat.select === true) {
                // Here I am going to dispatch an action
                console.log(f_cat.name);
                dispatch(delete_category_action(f_cat.name));
            }

        })
    }

    // When user perform update operations.
    const update_Btn_Clicked = () => {
        // Open The Modal.
        handleModalOpen();
        // categoryState.map(f_cat => {
        //     if (f_cat.select === true) {
        //         // Here I am going to dispatch an action
        //         console.log(f_cat.name);    
        //         dispatch(update_category_action(f_cat.name));
        //     }

        // })
    }
    const categoryUpdate = () => {
        handleModalClose();
        categoryState.map(f_cat => {
            if (f_cat.select === true) {
                // Here I am going to dispatch an action
                console.log(f_cat.name);
                dispatch(update_category_action(f_cat.name, description));
            }

        })
    }
    const renderLoader = () => {
        // return <Loader type="TailSpin" color="#00BFFF" height={40} width={40} />
        return <Loading />
    }

    return (
        <Layout sidebar>
            <div className="ftc-cate">
                {category.Loading ? renderLoader() : null}
                <div className="brd-cumb-div">
                    <Breadcrumb>
                        <Breadcrumb.Item href='http://localhost:9000/' className="brd-cumb">Dashboard</Breadcrumb.Item>
                        <Breadcrumb.Item className="brd-cumb" active>allCategory</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="h-lbl-div">
                    <label className="h-lbl">All Category</label>
                </div>
                {/*  */}
                {
                    renderButtons()
                }
                {/*  */}
                <div className="crte-cat-btn">
                    <NavLink to={'/category/create'}>Create New</NavLink>
                </div>
                <div className="ftc-main-div">
                    <Table responsive="md">
                        <thead>
                            <tr>
                                <th>
                                </th>
                                <th></th>
                                <th>Name</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                categoryState.map((cate, i) => (
                                    <tr key={cate.id} id={cate.id}>
                                        <td>
                                            <input
                                                className="option-input radio"
                                                onChange={(e) => {
                                                    let checked = e.target.checked;
                                                    setCategoryState(categoryState.map((data) => {
                                                        if (cate.id === data.id) {
                                                            data.select = checked;
                                                        }
                                                        return data;
                                                    })
                                                    );
                                                }}
                                                type="checkbox"
                                                checked={cate.select}
                                                value={cate.name}
                                            />
                                        </td>
                                        <td></td>
                                        <td>{cate.name}</td>
                                        <td>{cate.description}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                </div>
                <Modal className="modal" show={open} onHide={handleModalClose} animation={true}>
                    <Modal.Body className="modal-body">
                        <TextField
                            label="Update Description"
                            variant="outlined"
                            multiline={true}
                            rows={6}
                            className="des-inpt"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="Delete-btn" onClick={handleModalClose}>
                            Close
                        </button>
                        <button className="Update-btn" onClick={categoryUpdate}>
                            Update
                        </button>
                    </Modal.Footer>
                </Modal>
            </div>
        </Layout>
    )
}

export default Fetch_Category