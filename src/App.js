// import React, { useEffect, useState } from "react";
// import "./App.css";

// import AdminTable from "./components/adminTable/AdminTable";
// import DeleteSelectedButton from "./components/deleteSelectedButton/DeleteSelectedButton";
// import SearchBar from "./components/searchBar/SearchBar";
// import Pagination from "./components/pagination/Pagination";
// import Alert from "./components/alert/Alert";
// import filterData from "./utils/dataUtils";
// import Header from "./components/header/Header";
// import Footer from "./components/footer/Footer";

// function App() {
//   const [usersData, setUsersData] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedRows, setSelectedRows] = useState([]);
//   const [shouldShowEditModal, setShouldShowEditModal] = useState({
//     isModalOpen: false,
//     user: {},
//   });
//   const [currentPage, setCurrentPage] = useState(1);
//   const rowsPerPage = 10;

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   //function for fetching users Data
//   const fetchUsersData = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch(
//         "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
//       );
//       const data = await response.json();
//       setLoading(false);
//       setUsersData(data);
//     } catch (error) {
//       setLoading(false);
//       setError(error);
//     }
//   };

//   // Invoking function for fetching users Data on intial page load
//   useEffect(() => {
//     fetchUsersData();
//   }, []);

//   // handling the Search Query
//   const handleSearchQuery = (query) => {
//     setSearchQuery(query);
//     setCurrentPage(1);
//   };

//   //filtering data according to search Query
//   const filteredData = searchQuery
//     ? filterData(usersData, searchQuery)
//     : usersData;

//   // Handling rows when user selects Row(s)
//   const handleRowSelect = (row) => {
//     setSelectedRows((prevSelectedRows) =>
//       prevSelectedRows.includes(row)
//         ? prevSelectedRows.filter((user) => user.id !== row.id)
//         : [...prevSelectedRows, row]
//     );
//   };

//   // Handling rows when user selects All rows on a current page using selectAll input checkbox
//   function handleAllRowsSelect(currentRows) {
//     currentRows?.every((row) => selectedRows.includes(row))
//       ? setSelectedRows(
//           selectedRows.filter((row) => !currentRows.includes(row))
//         )
//       : setSelectedRows([
//           ...selectedRows,
//           ...currentRows.filter((row) => !selectedRows.includes(row)),
//         ]);
//   }

//   // Handling rows when user delets Row using delete (🗑️) action button
//   function handleDeleteRow(row) {
//     const updatedUsersData = usersData.filter((user) => user.id !== row.id);
//     const updatedSelectedRows = selectedRows.filter(
//       (user) => user.id !== row.id
//     );
//     setSelectedRows(updatedSelectedRows);
//     setUsersData(updatedUsersData);
//   }

//   // Handling rows when user Mass Deletes selected Row(s)
//   function handleDeleteSelected() {
//     const updatedUsersData = usersData.filter(
//       (user) => !selectedRows.includes(user)
//     );
//     setSelectedRows([]);
//     setUsersData(updatedUsersData);
//   }

//   // handling the updated row (after user clicks save button in update row modal)
//   const handleUpdateRowModal = (row) => {
//     setShouldShowEditModal({ isModalOpen: false, user: {} });
//     setUsersData(usersData.map((user) => (user?.id === row?.id ? row : user)));
//   };

//   // paginate according to pagination page numbers
//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   return (
//     <div className="main-container">
//       <Header />
//       <SearchBar
//         searchQuery={searchQuery}
//         handleSearchQuery={handleSearchQuery}
//       />

//       {loading || error ? (
//         loading ? (
//           <Alert alertType={"loading"} alertMessage={"Loading..."} />
//         ) : (
//           <Alert alertType={"error"} alertMessage={error.message} />
//         )
//       ) : (
//         <AdminTable
//           handleUpdateRowModal={handleUpdateRowModal}
//           setShouldShowEditModal={setShouldShowEditModal}
//           shouldShowEditModal={shouldShowEditModal}
//           filteredData={filteredData}
//           setCurrentPage={setCurrentPage}
//           currentPage={currentPage}
//           rowsPerPage={rowsPerPage}
//           selectedRows={selectedRows}
//           handleRowSelect={handleRowSelect}
//           handleDeleteRow={handleDeleteRow}
//           handleAllRowsSelect={handleAllRowsSelect}
//         />
//       )}

//       <div className="delete-selected-action-container">
//         <DeleteSelectedButton
//           handleDeleteSelected={handleDeleteSelected}
//           selectedRows={selectedRows}
//         />
//         <div>
//           <p className="selected-rows-count-text">
//             {selectedRows.length} rows selected
//           </p>
//         </div>
//       </div>
//       <Pagination
//         rowsPerPage={rowsPerPage}
//         totalRows={filteredData.length}
//         paginate={paginate}
//         currentPage={currentPage}
//       />
//       <Footer />
//     </div>
//   );
// }

// export default App;
// import React, { useEffect, useState } from "react";
// import "./App.css";
// import AdminTable from "./components/adminTable/AdminTable";
// import DeleteSelectedButton from "./components/deleteSelectedButton/DeleteSelectedButton";
// import SearchBar from "./components/searchBar/SearchBar";
// import Pagination from "./components/pagination/Pagination";
// import Alert from "./components/alert/Alert";
// import filterData from "./utils/dataUtils";
// import Header from "./components/header/Header";
// import Footer from "./components/footer/Footer";

// const API_URL =
//   "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

// const App = () => {
//   const [usersData, setUsersData] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedRows, setSelectedRows] = useState([]);
//   const [shouldShowEditModal, setShouldShowEditModal] = useState({
//     isModalOpen: false,
//     user: {},
//   });
//   const [currentPage, setCurrentPage] = useState(1);
//   const rowsPerPage = 10;
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const fetchUsersData = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch(API_URL);
//       if (!response.ok) {
//         throw new Error("Failed to fetch data");
//       }
//       const data = await response.json();
//       setUsersData(data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       setError("Failed to fetch data. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUsersData();
//   }, []);

//   const handleSearchQuery = (query) => {
//     setSearchQuery(query);
//     setCurrentPage(1);
//   };

//   const filteredData = searchQuery
//     ? filterData(usersData, searchQuery)
//     : usersData;

//   const handleRowSelect = (row) => {
//     setSelectedRows((prevSelectedRows) =>
//       prevSelectedRows.includes(row)
//         ? prevSelectedRows.filter((user) => user.id !== row.id)
//         : [...prevSelectedRows, row]
//     );
//   };

//   const handleAllRowsSelect = (currentRows) => {
//     setSelectedRows((prevSelectedRows) =>
//       currentRows.every((row) => prevSelectedRows.includes(row))
//         ? prevSelectedRows.filter((row) => !currentRows.includes(row))
//         : [...prevSelectedRows, ...currentRows.filter((row) => !prevSelectedRows.includes(row))]
//     );
//   };

//   const handleDeleteRow = (row) => {
//     const updatedUsersData = usersData.filter((user) => user.id !== row.id);
//     const updatedSelectedRows = selectedRows.filter(
//       (user) => user.id !== row.id
//     );
//     setSelectedRows(updatedSelectedRows);
//     setUsersData(updatedUsersData);
//   };

//   const handleDeleteSelected = () => {
//     const updatedUsersData = usersData.filter(
//       (user) => !selectedRows.includes(user)
//     );
//     setSelectedRows([]);
//     setUsersData(updatedUsersData);
//   };

//   const handleUpdateRowModal = (row) => {
//     setShouldShowEditModal({ isModalOpen: false, user: {} });
//     setUsersData(usersData.map((user) => (user?.id === row?.id ? row : user)));
//   };

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   return (
//     <div className="main-container">
//       <Header />
//       <SearchBar
//         searchQuery={searchQuery}
//         handleSearchQuery={handleSearchQuery}
//       />

//       {loading || error ? (
//         <Alert
//           alertType={loading ? "loading" : "error"}
//           alertMessage={loading ? "Loading..." : error}
//         />
//       ) : (
//         <AdminTable
//           handleUpdateRowModal={handleUpdateRowModal}
//           setShouldShowEditModal={setShouldShowEditModal}
//           shouldShowEditModal={shouldShowEditModal}
//           filteredData={filteredData}
//           setCurrentPage={setCurrentPage}
//           currentPage={currentPage}
//           rowsPerPage={rowsPerPage}
//           selectedRows={selectedRows}
//           handleRowSelect={handleRowSelect}
//           handleDeleteRow={handleDeleteRow}
//           handleAllRowsSelect={handleAllRowsSelect}
//         />
//       )}

//       <div className="delete-selected-action-container">
//         <DeleteSelectedButton
//           handleDeleteSelected={handleDeleteSelected}
//           selectedRows={selectedRows}
//         />
//         <div>
//           <p className="selected-rows-count-text">
//             {selectedRows.length} rows selected
//           </p>
//         </div>
//       </div>
//       <Pagination
//         rowsPerPage={rowsPerPage}
//         totalRows={filteredData.length}
//         paginate={paginate}
//         currentPage={currentPage}
//       />
//       <Footer />
//     </div>
//   );
// };

// export default App;
import React, { useEffect, useState } from "react";
import "./App.css";
import AdminTable from "./components/adminTable/AdminTable";
import DeleteSelectedButton from "./components/deleteSelectedButton/DeleteSelectedButton";
import SearchBar from "./components/searchBar/SearchBar";
import Pagination from "./components/pagination/Pagination";
import Alert from "./components/alert/Alert";
import filterData from "./utils/dataUtils";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

const API_URL =
  "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

const App = () => {
  const [usersData, setUsersData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [editModal, setEditModal] = useState({ isOpen: false, user: {} });
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setUsersData(data);
      setError("");
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to fetch data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const filteredData = searchQuery
    ? filterData(usersData, searchQuery)
    : usersData;

  const handleRowSelect = (row) => {
    setSelectedRows((prevSelectedRows) =>
      prevSelectedRows.includes(row)
        ? prevSelectedRows.filter((user) => user.id !== row.id)
        : [...prevSelectedRows, row]
    );
  };

  const handleAllRowsSelect = (currentRows) => {
    setSelectedRows((prevSelectedRows) =>
      currentRows.every((row) => prevSelectedRows.includes(row))
        ? prevSelectedRows.filter((row) => !currentRows.includes(row))
        : [...prevSelectedRows, ...currentRows.filter((row) => !prevSelectedRows.includes(row))]
    );
  };

  const handleDeleteRow = (row) => {
    const updatedUsersData = usersData.filter((user) => user.id !== row.id);
    const updatedSelectedRows = selectedRows.filter(
      (user) => user.id !== row.id
    );
    setSelectedRows(updatedSelectedRows);
    setUsersData(updatedUsersData);
  };

  const handleDeleteSelected = () => {
    const updatedUsersData = usersData.filter(
      (user) => !selectedRows.includes(user)
    );
    setSelectedRows([]);
    setUsersData(updatedUsersData);
  };

  const handleUpdateRow = (updatedRow) => {
    setEditModal({ isOpen: false, user: {} });
    setUsersData((prevData) =>
      prevData.map((user) => (user?.id === updatedRow?.id ? updatedRow : user))
    );
  };

  const handlePagination = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="main-container">
      <Header />
      <SearchBar searchQuery={searchQuery} handleSearchQuery={handleSearch} />

      {loading || error ? (
        <Alert
          alertType={loading ? "loading" : "error"}
          alertMessage={loading ? "Loading..." : error}
        />
      ) : (
        <AdminTable
          handleUpdateRow={handleUpdateRow}
          setEditModal={setEditModal}
          editModal={editModal}
          filteredData={filteredData}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          rowsPerPage={rowsPerPage}
          selectedRows={selectedRows}
          handleRowSelect={handleRowSelect}
          handleDeleteRow={handleDeleteRow}
          handleAllRowsSelect={handleAllRowsSelect}
        />
      )}

      <div className="delete-selected-action-container">
        <DeleteSelectedButton
          handleDeleteSelected={handleDeleteSelected}
          selectedRows={selectedRows}
        />
        <div>
          <p className="selected-rows-count-text">
            {selectedRows.length} rows selected
          </p>
        </div>
      </div>
      <Pagination
        rowsPerPage={rowsPerPage}
        totalRows={filteredData.length}
        paginate={handlePagination}
        currentPage={currentPage}
      />
      <Footer />
    </div>
  );
};

export default App;