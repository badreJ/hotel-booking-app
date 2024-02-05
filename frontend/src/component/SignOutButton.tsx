import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";

const SignOutButton = () => {
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();
  const mutation = useMutation(apiClient.signOut, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      showToast({
        message: "Sign out successful!",
        type: "SUCCESS",
      });
    },
    onError: (error: Error) => {
      showToast({
        message: error.message,
        type: "ERROR",
      });
    },
  });
  const handleClick = () => {
    mutation.mutate();
  };
  return (
    <button 
      onClick={handleClick}
      className="text-white font-bold hover:underline px-3"
    >
      Sign Out
    </button>
  );
};

export default SignOutButton;
