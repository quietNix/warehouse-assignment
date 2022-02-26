import "./Listing.scss"
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { connect } from "react-redux";
import { editImmutableWarehouseData } from "../../redux/action";
import { DesktopIcon, WriteIcon } from "../../assets/icon/Svg";


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


function Listing({ immutableWarehouseData, editGlobalImmutableWarehouseData }) {
    const navigate = useNavigate();
    const [warehouseData, setWarehouseData] = useState(immutableWarehouseData);

    useEffect(() => {
        setWarehouseData(immutableWarehouseData)
    }, [immutableWarehouseData])


    const inputValues = useRef({
        is_registered: "",
        is_live: "",
        name: "",
        code: "",
        city: "",
        space_available: "",
        type: "",
        cluster: ""
    })

    function handleSearch({ target }) {
        const { name, value } = target;
        inputValues.current = { ...inputValues.current, [name]: value.toLowerCase() }
        let currInputValues = inputValues.current;

        setWarehouseData(
            immutableWarehouseData.filter((warehouse) =>
                warehouse.is_registered.toString().toLowerCase().includes(currInputValues.is_registered)
                &&
                warehouse.is_live.toString().toLowerCase().includes(currInputValues.is_live)
                &&
                warehouse.name.toLowerCase().includes(currInputValues.name)
                &&
                warehouse.code.toLowerCase().includes(currInputValues.code)
                &&
                warehouse.city.toLowerCase().includes(currInputValues.city)
                &&
                warehouse.space_available.toString().toLowerCase().includes(currInputValues.space_available)
                &&
                warehouse.type.toLowerCase().includes(currInputValues.type)
                &&
                warehouse.cluster.toLowerCase().includes(currInputValues.cluster)
            )
        )
    }

    function handleSort({ sortOn, asc = true }) {
        switch (sortOn) {
            case "isLive":
                setWarehouseData((prevPatientData) => [...prevPatientData.sort((a, b) => compare(a.isLive, b.isLive, asc))]);
                break;
            case "name":
                setWarehouseData((prevPatientData) => [...prevPatientData.sort((a, b) => compare(a.name, b.name, asc))]);
                break;
            case "code":
                setWarehouseData((prevPatientData) => [...prevPatientData.sort((a, b) => compare(a.code, b.code, asc))]);
                break;
            case "city":
                setWarehouseData((prevPatientData) => [...prevPatientData.sort((a, b) => compare(a.city, b.city, asc))]);
                break;
            case "spaceAvailable":
                setWarehouseData((prevPatientData) => [...prevPatientData.sort((a, b) => compare(a.space_available, b.space_available, asc))]);
                break;
            case "type":
                setWarehouseData((prevPatientData) => [...prevPatientData.sort((a, b) => compare(a.type, b.type, asc))]);
                break;
            case "cluster":
                setWarehouseData((prevPatientData) => [...prevPatientData.sort((a, b) => compare(a.cluster, b.cluster, asc))]);
                break;
            default:
                break;
        }
    }

    function compare(a, b, asc) {
        if (asc) {
            if (a < b) return -1;
            if (a > b) return 1;
        }
        else {
            if (a < b) return 1;
            if (a > b) return -1;
        }
        return 0;
    }

    function handleNavigate(index) {
        navigate(`./detail/${index+1}`, { replace: true });
    }

    return (
        <section className="listing">
            <h1>Listing</h1>
            <table className="listing-table">
                <thead verticle-align="top">
                    <tr>
                        <th>
                            <div className="listing-table-columnCell">
                                <span>
                                    <p className="typo__p">Id</p>
                                </span>
                            </div>
                        </th>
                        <th>
                            <div className="listing-table-columnCell">
                                <span>
                                    <p className="typo__p">Is Registered</p>
                                </span>
                                <span>
                                    <select onChange={handleSearch} name="is_registered" id="isRegistered">
                                        <option value="">Select</option>
                                        <option value="true">True</option>
                                        <option value="false">False</option>
                                    </select>
                                </span>
                            </div>
                        </th>
                        <th>
                            <div className="listing-table-columnCell">
                                <span>
                                    <p className="typo__p">Is Live</p>
                                </span>
                                <span>
                                    <select onChange={handleSearch} name="is_live" id="isLive">
                                        <option value="">Select</option>
                                        <option value="true">True</option>
                                        <option value="false">False</option>
                                    </select>
                                </span>
                            </div>
                        </th>
                        <th>
                            <div className="listing-table-columnCell">
                                <span>
                                    <p className="typo__p">Warehouse Name</p>
                                    <span>
                                        <i onClick={() => handleSort({ sortOn: "name", asc: true })}>▲</i>
                                        <i onClick={() => handleSort({ sortOn: "name", asc: false })}>▼</i>
                                    </span>
                                </span>
                                <input onChange={handleSearch} autoComplete="off" name="name" type="text" placeholder="Search" />
                            </div>
                        </th>
                        <th>
                            <div className="listing-table-columnCell">
                                <span>
                                    <p className="typo__p">Code</p>
                                    <span>
                                        <i onClick={() => handleSort({ sortOn: "code", asc: true })}>▲</i>
                                        <i onClick={() => handleSort({ sortOn: "code", asc: false })}>▼</i>
                                    </span>
                                </span>
                                <input onChange={handleSearch} autoComplete="off" name="code" type="text" placeholder="Search" />
                            </div>
                        </th>
                        <th>
                            <div className="listing-table-columnCell">
                                <span>
                                    <p className="typo__p">City</p>
                                    <span>
                                        <i onClick={() => handleSort({ sortOn: "city", asc: true })}>▲</i>
                                        <i onClick={() => handleSort({ sortOn: "city", asc: false })}>▼</i>
                                    </span>
                                </span>
                                <input onChange={handleSearch} autoComplete="off" name="city" type="text" placeholder="Search" />
                            </div>
                        </th>
                        <th>
                            <div className="listing-table-columnCell">
                                <span>
                                    <p className="typo__p">Space Available</p>
                                    <span>
                                        <i onClick={() => handleSort({ sortOn: "spaceAvailable", asc: true })}>▲</i>
                                        <i onClick={() => handleSort({ sortOn: "spaceAvailable", asc: false })}>▼</i>
                                    </span>
                                </span>
                                <input onChange={handleSearch} autoComplete="off" name="space_available" type="text" placeholder="Search" />
                            </div>
                        </th>
                        <th>
                            <div className="listing-table-columnCell">
                                <span>
                                    <p className="typo__p">Type</p>
                                    <span>
                                        <i onClick={() => handleSort({ sortOn: "type", asc: true })}>▲</i>
                                        <i onClick={() => handleSort({ sortOn: "type", asc: false })}>▼</i>
                                    </span>
                                </span>
                                <input onChange={handleSearch} autoComplete="off" name="type" type="text" placeholder="Search" />
                            </div>
                        </th>
                        <th>
                            <div className="listing-table-columnCell">
                                <span>
                                    <p className="typo__p">Cluster</p>
                                    <span>
                                        <i onClick={() => handleSort({ sortOn: "cluster", asc: true })}>▲</i>
                                        <i onClick={() => handleSort({ sortOn: "cluster", asc: false })}>▼</i>
                                    </span>
                                </span>
                                <input onChange={handleSearch} autoComplete="off" name="cluster" type="text" placeholder="Search" />
                            </div>
                        </th>
                        <th><p className="typo__p">Edit</p></th>
                    </tr>
                </thead>
                <tbody>
                    {warehouseData.map((warehouse, index) => (
                        <tr key={warehouse.id} onClick={() => handleNavigate(index)}>
                            <td>{warehouse.id}</td>
                            <td>{warehouse.is_registered.toString()}</td>
                            <td>{warehouse.is_live.toString()}</td>
                            <td>{warehouse.name}</td>
                            <td>{warehouse.code}</td>
                            <td>{warehouse.city}</td>
                            <td>{warehouse.space_available}</td>
                            <td>{warehouse.type}</td>
                            <td>{warehouse.cluster}</td>
                            <td align="middle">
                                <button className="listing-table__actionBtn">
                                    <WriteIcon />
                                    <DesktopIcon />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Listing);