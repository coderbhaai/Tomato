import React, { Component } from 'react'
import { Link } from 'react-router-dom'


export class AdminSidebar extends Component {
    render() {
        return (
            <div className="col-sm-2">
                <ul>
                    <li><Link to="/adminLeads">Leads</Link></li>
                    <li><Link to="/adminBlogMeta">Blog Meta</Link></li>
                    <li><Link to="/adminBlogs">Blog List</Link></li>
                    <li><Link to="/adminMeta">Meta</Link></li>
                    <li><Link to="/adminProducts">Products</Link></li> 
                    <li><Link to="/adminBasics">Basics</Link></li> 
                    <li><Link to="/adminComments">Comments</Link></li>
                    <li><Link to="/adminOrders">Orders</Link></li>
                    <li><Link to="/adminCoupon">Coupons</Link></li>
                    <li><Link to="/adminShipping">Shipping</Link></li>
                </ul>
            </div>
        )
    }
}

export default AdminSidebar