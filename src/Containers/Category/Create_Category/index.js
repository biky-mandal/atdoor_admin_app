import React, { useState } from 'react'
import './style.css';
import Layout from '../../../Components/Layout'
import { Breadcrumb,} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { TextField, Button } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux';
import { create_category_action } from '../../../Actions';
import Loading from '../../../Components/Loader';
import {Redirect} from 'react-router-dom';




/**
* @author
* @function Create_Category
**/

const Create_Category = (props) => {

    const dispatch = useDispatch();
    const category = useSelector(state => state.category);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const clicked = (e) => {
        const new_category = { name, description };

        dispatch(create_category_action(new_category))

        setName('');
        setDescription('');
    }   
    const renderLoader = () => {
        // return <Loader type="TailSpin" color="#00BFFF" height={40} width={40} />
        return <Loading />
    }

    return (
        <Layout sidebar>
            <div className="cr-cate">
            {category.Loading ? renderLoader() : null}
                <div className="brd-cumb-div">
                    <Breadcrumb>
                        <Breadcrumb.Item href='http://localhost:9000/' className="brd-cumb">Dashboard</Breadcrumb.Item>
                        <Breadcrumb.Item href='http://localhost:9000/category/fetch' className="brd-cumb">allcategory</Breadcrumb.Item>
                        <Breadcrumb.Item className="brd-cumb" active>addCategory</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="h-lbl1-div">
                    <label className="h-lbl1">Add Category</label>
                </div>
                <div className="cancel-cat-btn">
                    <NavLink to={'/category/fetch'}>Cancel</NavLink>
                </div>
                {/*  */}
                {/*  */}
                <div className="cr-main-div">
                    <TextField
                        label="Category Name"
                        variant="outlined"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="textinpt"
                    />
                    <TextField
                        label="Description"
                        variant="outlined"
                        multiline={true}
                        rows={10}
                        className="textinpt2"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <div className="btn-div">
                        <Button variant="outlined" className="cr-pr-btn" onClick={clicked} color="primary">
                            Create
                        </Button>
                    </div>

                </div>
            </div>
        </Layout>
    )

}

export default Create_Category