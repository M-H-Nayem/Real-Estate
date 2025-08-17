
import useAuth from "../../Hooks/useAuth";
import useUserRole from "../../Hooks/useUserRole";

const Profile = () => {
  const { user } = useAuth();
  let {role }= useUserRole()
  // console.log(role);

  if (role==='admin') {
    return (

      <div className="w-full flex justify-center items-center h-screen">


    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded-xl   ">
      <h2 className="text-2xl font-bold mb-6 text-center text-red-600">
        🛡️ My Profile
      </h2>

      <div className="flex flex-col items-center gap-4">
        <img
          src={user?.photoURL}
          alt="Admin"
          className="w-32 h-32 rounded-full object-cover border-4 border-red-400 shadow-md"
        />
        <div className="text-center space-y-2">
          <h3 className="text-xl font-semibold">{user?.displayName}</h3>
          <p className="text-gray-600">{user?.email}</p>
          <p className="text-sm text-white bg-red-500 px-3 py-1 rounded-full inline-block mt-1 capitalize">
            {role}
          </p>
        </div>
      </div>
    </div>
      </div>
  );
  }
  else if (role==='fraud'|| role==='agent'){
    return (

      <div className="w-full flex justify-center items-center h-screen">

    <div className="max-w-2xl  mx-auto p-6 bg-white shadow rounded-xl ">
      <h2 className="text-2xl font-bold mb-6 text-center text-green-600">
        🧑‍💼 My Profile
      </h2>

      <div className="flex flex-col items-center gap-4">
        <img
          src={user?.photoURL}
          alt="Agent"
          className="w-32 h-32 rounded-full object-cover border-4 border-green-400 shadow-md"
        />
        <div className="text-center space-y-2">
          <h3 className="text-xl font-semibold">{user?.displayName}</h3>
          <p className="text-gray-600">{user?.email}</p>
          <p className={`text-sm text-white ${role==='agent' && 'bg-green-500'} ${role==='fraud' && 'bg-red-500'}  px-3 py-1 rounded-full inline-block mt-1 capitalize`}>
            {role}
          </p>
        </div>
      </div>
    </div>

      </div>
  );
  }

  else{
 return (
  <div className="w-full flex justify-center items-center h-screen">
    <div className="w-2xl mx-auto p-6 bg-white shadow rounded-xl my-[10%] ">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
        👤 My Profile
      </h2>
      <title>Profile</title>

      <div className="flex flex-col items-center gap-4">
        <img
          src={user?.photoURL}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover border-4 border-blue-300 shadow-md"
        />
        <div className="text-center space-y-2">
          <h3 className="text-xl font-semibold">{user?.displayName}</h3>
          <p className="text-gray-600">{user?.email}</p>
          <p className="text-sm text-white bg-blue-500 px-3 py-1 rounded-full inline-block mt-1 capitalize ">
           {role}
          </p>
        </div>
      </div>
    </div>
    
      </div>
  );
  }


  
};

export default Profile;
