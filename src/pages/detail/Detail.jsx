import "./Detail.scss"
import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { connect } from "react-redux";
import { editImmutableWarehouseData } from "../../redux/action";

const mapStateToProps = (state) => {
  return {
    immutableWarehouseData: state.immutableWarehouseData
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    editGlobalImmutableWarehouseData: (verdict) => dispatch(editImmutableWarehouseData(verdict))
  }
}

function Detail({ immutableWarehouseData, editGlobalImmutableWarehouseData }) {
  const navigate = useNavigate();
  const { id } = useParams()

  const warehouse = useRef(immutableWarehouseData[id-1]);
  const [inputValues, setInputValues] = useState(
    {
      id: warehouse.current.id,
      is_registered: warehouse.current.is_registered,
      is_live: warehouse.current.is_live,
      name: warehouse.current.name,
      code: warehouse.current.code,
      city: warehouse.current.city,
      space_available: warehouse.current.space_available,
      type: warehouse.current.type,
      cluster: warehouse.current.cluster
    }
  )

  function handleChange({ target }) {
    const { name, value } = target;
    setInputValues(prevInputValue => ({ ...prevInputValue, [name]: value }))
  }

  function handleEdit(e) {
    e.preventDefault();
    // immutableWarehouseData[id-1] = inputValues;
    let updatedWarehouseData = immutableWarehouseData.map((warehouse, index)=> {
      if(index===(id-1)) return inputValues;
      return warehouse;
    })

    editGlobalImmutableWarehouseData(updatedWarehouseData);
    navigate("/", { replace: true })
  }

  return (
    <section className="detail">
      <h1>Detail of {Number(id)} </h1>
      <form>
        <div>
          <label htmlFor="is_live">Registeration Status</label>
          <select onChange={handleChange} name="is_registered" id="is_registered">
            {inputValues.is_registered ?
              <>
                <option value="true">True</option>
                <option value="false">False</option>
              </>
              :
              <>
                <option value="false">False</option>
                <option value="true">True</option>
              </>
            }
          </select>
        </div>
        <div>
          <label htmlFor="is_live">Live Status</label>
          <select onChange={handleChange} name="is_live" id="is_live">
            {inputValues.is_live ?
              <>
                <option value="true">True</option>
                <option value="false">False</option>
              </>
              :
              <>
                <option value="false">False</option>
                <option value="true">True</option>
              </>
            }
          </select>
        </div>
        <div>
          <label htmlFor="name">Warehouse Name</label>
          <input onChange={handleChange} name="name" value={inputValues.name} />
        </div>

        <div>
          <label htmlFor="code">Code</label>
          <input onChange={handleChange} name="code" value={inputValues.code} />
        </div>

        <div>
          <label htmlFor="city">City</label>
          <input onChange={handleChange} name="city" value={inputValues.city} />
        </div>

        <div>
          <label htmlFor="space_available">Space Available</label>
          <input onChange={handleChange} name="space_available" value={inputValues.space_available} />
        </div>

        <div>
          <label htmlFor="type">Type</label>
          <input onChange={handleChange} name="type" value={inputValues.type} />
        </div>

        <div>
          <label htmlFor="cluster">Cluster</label>
          <input onChange={handleChange} name="cluster" value={inputValues.cluster} />
        </div>
      </form>

      <button className="detail__btn" type="submit" onClick={handleEdit}>Edit</button>
    </section>

  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail);