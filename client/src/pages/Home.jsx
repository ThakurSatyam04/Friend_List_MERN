import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import Users from "../components/Users";
import axios from "axios";
import { API_URL } from "../env";
import { Link } from "react-router-dom";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedGender, setSelectedGender] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('');
  const [selectedAvailability, setSelectedAvailability] = useState('');
  const [filteredData, setFilteredData] = useState(users);
  console.log("selected",selectedGender)

  const domains = [
    "Finance",
    "Marketing",
    "Management",
    "Sales",
    "UI Designing",
    "IT",
    "Business Development",
  ];
  const genders = [
    "Female",
    "Male",
    "Polygender",
    "Genderqueer",
    "Non-binary",
    "Bigender",
    "Agender",
    "Genderfluid",
  ];

  const [searchTerm, setSearchTerm] = useState("");

  const startIndex = (currentPage - 1) * 20;
  const endIndex = startIndex + 20;
  const totalPages = Math.ceil(users.length / 20);

  const getData = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${API_URL}/api/user`);
      setUsers(data);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
  };

  const handleDomainChange = (event) => {
    setSelectedDomain(event.target.value);
  };

  const handleAvailabilityChange = (event) => {
    setSelectedAvailability(event.target.value);
  };

  useEffect(() => {
    // Apply filters when any of the filter options change
    filterData();
  }, [selectedGender, selectedDomain, selectedAvailability]);

  const filterData = () => {
    // Apply filters based on selected options
    let result = users;

    if (selectedGender !== '') {
      result = result.filter(item => item.gender === selectedGender);
    }

    if (selectedDomain !== '') {
      result = result.filter(item => item.domain === selectedDomain);
    }

    if (selectedAvailability !== '') {
      const availability = selectedAvailability;
      result = result.filter(item => item.available === availability);
    }

    setFilteredData(result);
  };

  const handleSearchTermChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);

    const searched = users.filter((user) => {
      const fullName = user.first_name + " " + user.last_name;
      return fullName.toLowerCase().includes(term.toLowerCase());
    });
    setFilteredData(searched);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [users]);

  return (
    <div>
      {
        <div className="flex justify-between m-4 items-center">
          <form class="w-[300px] flex items-center m-4">
            <label for="simple-search" class="sr-only">
              Search
            </label>
            <div class="relative w-full">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  aria-hidden="true"
                  class="w-5 h-5 text-black dark:text-black"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="text"
                id="simple-search"
                placeholder="Search by name"
                value={searchTerm}
                onChange={handleSearchTermChange}
              />
            </div>
          </form>

          <form className="flex gap-2">
            <select
              id="select_genders"
              onChange={handleGenderChange}
              value={selectedGender} 
              className="cursor-pointer border border-gray-300 rounded-md py-2 px-2 leading-tight focus:outline-none focus:border-blue-500"
            >
              <option value="" disabled className="text-gray-500">
                Select Gender
              </option>
              {genders.map((gender) => (
                <option key={gender} value={gender}>
                  {gender}
                </option>
              ))}
            </select>
            <select
              id="select_domain"
              onChange={handleDomainChange}
              value={selectedDomain}
              className="cursor-pointer border border-gray-300 rounded-md py-2 px-2 leading-tight focus:outline-none focus:border-blue-500"
            >
              <option value="" disabled className="text-gray-500">
                Select Domain
              </option>
              {domains.map((domain) => (
              <option key={domain} value={domain}>
                {domain}
              </option>
            ))}
            </select>

            <select
              id="available"
              value={selectedAvailability}
              onChange={handleAvailabilityChange}
              className="cursor-pointer border border-gray-300 rounded-md py-2 px-2 leading-tight focus:outline-none focus:border-blue-500"
            >
              <option value="" disabled className="text-gray-500">
                Select Availability
              </option>
              <option value="true" className="text-gray-500">
                True
              </option>
              <option value="false" className="text-gray-500">
                False
              </option>
            </select>
          </form>

          <Link to="/AddUserForm">
            <button className=" items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Add User +
            </button>
          </Link>
        </div>
      }

      {loading ? (
        <Spinner />
      ) : users.length > 0 ? (
        <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-6xl mx-auto min-h-[80vh] cursor-pointer">
          {searchTerm === "" && selectedGender === "" && selectedDomain === ""
            ? users
                .slice(startIndex, endIndex)
                .map((post) => <Users key={post.id} post={post} />)
            : filteredData
                .slice(startIndex, endIndex)
                .map((post) => <Users key={post.id} post={post} />)
          }
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <p>No Data Found</p>
        </div>
      )}
      {
        <div className="w-full flex items-center m-auto justify-center mt-4 mb-4">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l ${
              currentPage === 1 ? "cursor-not-allowed" : ""
            }`}
          >
            Prev
          </button>
          <div>
              <span className="py-2 px-4">{`Page ${currentPage} of ${totalPages}`}</span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r ${
                  currentPage === totalPages ? "cursor-not-allowed" : ""
                }`}
              >
                Next
              </button>
          </div>
        </div>
      }
    </div>
  );
};

export default Home;
