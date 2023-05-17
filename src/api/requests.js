import axios from "axios";
import toast from "react-hot-toast";

export async function sendPasswordRecoveryEmail({ email, router, helpers }) {
  try {
    await axios.post("/api/user/send-email", { email });

    router.push("/authentication/recovery-success");
  } catch (error) {
    helpers.setStatus({ success: false });
    helpers.setErrors({ submit: error.message });
    helpers.setSubmitting(false);
    toast.error(
      error?.response?.data?.message
        ? error?.response?.data?.message
        : "Something went wrong! Please, try again later"
    );
  }
}

export async function updateUserPassword({
  new_password,
  router,
  helpers,
  auth,
}) {
  try {
    await axios({
      method: "POST",
      url: "/api/user/update-password",
      headers: { auth },
      data: { new_password },
    });

    router.push("/authentication/reset-success");
  } catch (error) {
    helpers.setStatus({ success: false });
    helpers.setErrors({ submit: error.message });
    helpers.setSubmitting(false);
    toast.error(
      error?.response?.data?.message
        ? error?.response?.data?.message
        : "Something went wrong! Please, try again later"
    );
  }
}

export async function getUploadedFileResults(data) {
  try {
    const result = await axios({
      method: "POST",
      url: "/api/user/upload-file",
      data: data,
    });
    return result.data;
  } catch (error) {
    toast.error(
      error?.response?.data?.message
        ? error?.response?.data?.message
        : "Something went wrong! Please, try again later"
    );
  }
}

export async function getUserProfile() {
  try {
    const result = await axios.get("/api/user/profile", {
      withCredentials: true,
    });
    return result.data;
  } catch (error) {
    console.log(error);
  }
}

export async function editUserProfile() {}

export async function getUsersPfofiles() {
  try {
    const result = await axios.get("/api/admin/user/all-users", {
      withCredentials: true,
    });
    return result.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getAllCompanyReports() {
  try {
    const result = await axios.get("/api/user/reports", {
      withCredentials: true,
    });
    return result.data;
  } catch (error) {
    console.log(error);
  }
}
