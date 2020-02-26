import React, { Component } from 'react';
import axios from 'axios';
import { Redirect, Route } from "react-router-dom";

function AddProducts(props)
{
return(
    <div>
    <form>
    <label>Title<label>
    <input/>
    </label>Description</label>
    <input/>
    <label>Category</label>
    <input/>
    <label>Location</label>
    <input/>
    <label>Images</label>
    <input/>
    <label>Price</label>
    <input/>
    <label>Delivery type</label>
    <input/>
    
    </form>
    </div>
)

}
export default AddProducts