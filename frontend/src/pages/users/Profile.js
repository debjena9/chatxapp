import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Image, Button } from 'react-bootstrap';
import { useAuth } from "../../AuthContext";
import { toast } from "react-toastify"

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Profile() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const { currentUser, updateUserProfile, setError } = useAuth();

  const handleFormSubmit = async (e) => {
    e.preventDefault();


    try {
      setError("");
      setLoading(true);
      const user = currentUser;
      const profile = {
        displayName: username,
        photoURL: '',
      };
      await updateUserProfile(user, profile);
      navigate("/");
    } catch (e) {
      setError("Failed to update profile");
      toast.error("Failed to update profile")
    }

    setLoading(false);
  };

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-4 text-3xl text-center tracking-tight font-light dark:text-white">
            Update Profile - TODO
          </h2>
        </div>
        {/* <Form className="space-y-6" onSubmit={handleFormSubmit}>
  <div className="flex flex-wrap -m-1 md:-m-2">
    {avatars.map((avatar, index) => (
      <div key={index} className="flex flex-wrap w-1/3">
        <div className="w-full p-1 md:p-2">
          <Image
            alt="gallery"
            className={classNames(
              index === selectedAvatar ? "border-4  border-blue-700 dark:border-blue-700" : "cursor-pointer hover:border-4 hover:border-blue-700",
              "block object-cover object-center w-36 h-36 rounded-full"
            )}
            src={avatar}
            onClick={() => setSelectedAvatar(index)}
          />
        </div>
      </div>
    ))}
  </div>

  <Form.Group controlId="username">
    <Form.Control
      type="text"
      autoComplete="username"
      required
      placeholder="Enter a Display Name"
      defaultValue={currentUser.displayName && currentUser.displayName}
      onChange={(e) => setUsername(e.target.value)}
    />
  </Form.Group>

  <Button
    type="submit"
    disabled={loading}
    className="w-full py-2 px-4 text-sm font-medium bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
  >
    Update Profile
  </Button>
</Form> */}
      </div>
    </div>
  );
}
