'use client'

import {formSubmit} from '@/actions/addSupplier';
import { useActionState } from 'react';

export default function AddSupplier() {
 
  const [state, formAction] = useActionState(formSubmit, {status: 0, message: "pending"});

  return (

    <div id="add-supplier" className="card mb-4">
      <div className="card-body">
        <h4>Add Supplier</h4>
        
        {/* <form action={formSubmit}> */}
        <form action={formAction}>

          {"status: " + state.status + " message: " + state.message}

          <div className="form-group">
            <label htmlFor="supplier-id">Supplier Name</label>
            <input
              id="supplier-id"
              name="id"
              className="form-control"
              type="text"
              placeholder="Supplier ID"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="supplier-name">Supplier Name</label>
            <input
              id="supplier-name"
              name="name"
              className="form-control"
              type="text"
              placeholder="Supplier name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="supplier-contact">Contact Person</label>
            <input
              id="supplier-contact"
              name="contactPerson"
              className="form-control"
              type="text"
              placeholder="Contact person"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="supplier-email">Email</label>
            <input
              id="supplier-email"
              name="email"
              className="form-control"
              type="email"
              placeholder="name@company.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="supplier-location">Location</label>
            <input
              id="supplier-location"
              name="location"
              className="form-control"
              type="text"
              placeholder="City"
              required
            />
          </div>

          <br />
          <button className="btn btn-primary" type="submit">
            Add Supplier
          </button>
        </form>
      </div>
    </div>
  );
}