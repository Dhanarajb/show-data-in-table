import { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import './table.css';

const Table = () => {
  const [data, setData] = useState([]);
  const [editData, setEditData] = useState(null);
  const [deleteData, setDeleteData] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://assets.alippo.com/catalog/static/data.json"
      );
      setData(response.data || []);
      setLoading(false);
    } catch (error) {
      setError("Error fetching data. Please try again later.");
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const handleEdit = (rowData) => {
    setEditData(rowData);
    setShowEditModal(true);
  };

  const handleEditSubmit = () => {
    const dataIndex = data.findIndex((item) => item.id === editData.id);
    const updatedData = [...data];
    updatedData[dataIndex] = { ...editData };
    setData(updatedData);
    setShowEditModal(false);
  };

  const handleCancelEdit = () => {
    setShowEditModal(false);
  };

  const handleDelete = (rowData) => {
    setDeleteData(rowData);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    const dataIndex = data.findIndex((item) => item.id === deleteData.id);
    const updatedData = [...data];
    updatedData.splice(dataIndex, 1);
    setData(updatedData);
    setShowDeleteModal(false);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="table-container">
      <h2>Data Table</h2>
      <table>
        <thead>
          <tr>
            <th>SL. No</th>
            <th>Name</th>
            <th>Age</th>
            <th>City</th>
            <th>Pin Code</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr className="map-data" key={index}>
              <td>{index + 1}</td>
              <td>{row.name}</td>
              <td>{row.age}</td>
              <td>{row.city}</td>
              <td>{row.pinCode || "-"}</td>
              <td>
                <button onClick={() => handleEdit(row)}>Edit</button>
                <button onClick={() => handleDelete(row)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>


      <Modal
        isOpen={showEditModal}
        onRequestClose={handleCancelEdit}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          },
        }}
      >
        <div className="edit-modal">
          <h2>Edit Entry</h2>
          <label>Name: </label>
          <input
            type="text"
            value={editData?.name || ""}
            onChange={(e) =>
              setEditData({ ...editData, name: e.target.value })
            }
          />
          <label>Age: </label>
          <input
            type="text"
            value={editData?.age || ""}
            onChange={(e) =>
              setEditData({ ...editData, age: e.target.value })
            }
          />
          <label>City: </label>
          <input
            type="text"
            value={editData?.city || ""}
            onChange={(e) =>
              setEditData({ ...editData, city: e.target.value })
            }
          />
          <label>Pin Code: </label>
          <input
            type="text"
            value={editData?.pinCode || ""}
            onChange={(e) =>
              setEditData({ ...editData, pinCode: e.target.value })
            }
          />
          <button onClick={handleEditSubmit}>Submit</button>
          <button onClick={handleCancelEdit}>Cancel</button>
        </div>
      </Modal>

      <Modal
        isOpen={showDeleteModal}
        onRequestClose={handleCancelDelete}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          },
        }}
      >
        <div className="delete-modal">
          <h2>Delete Entry</h2>
          <p>Are you sure you want to delete this entry?</p>
          <button onClick={handleDeleteConfirm}>Delete</button>
          <button onClick={handleCancelDelete}>Cancel</button>
        </div>
      </Modal>
    </div>
  );
};

export default Table;
