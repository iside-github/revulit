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

export async function getUploadedFileResults({ data, update }) {
  try {
    const result = await axios({
      method: "POST",
      url: "/api/user/upload-file",
      data: data,
    });
    update();
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

export async function getCategoryData({ id, category }) {
  try {
    const result = await axios.get(
      `/api/user/filtered-reports/${id}?category=${category}`,
      {
        withCredentials: true,
      }
    );
    return result.data;
  } catch (error) {
    console.log(error);
  }
}

export async function inviteCompanyUser({ data, handleClose, resetForm }) {
  try {
    const res = await axios({
      url: "/api/user/add-user",
      method: "POST",
      data,
    });
    toast.success(res.data?.message);
    handleClose();
  } catch (error) {
    handleClose();
    toast.error(
      error?.response?.data?.message
        ? error?.response?.data?.message
        : "Something went wrong! Please, try again later"
    );
  }
}

export async function confirmAccount({ new_password, router, helpers, auth }) {
  try {
    await axios({
      method: "POST",
      url: "/api/user/confirmation",
      headers: { auth },
      data: { password: new_password },
    });

    router.push("/authentication/conformation-success");
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

export async function getCompaniesListAll() {
  try {
    const result = await axios.get("/api/admin/company/all", {
      withCredentials: true,
    });
    return result.data;
  } catch (error) {
    console.log(error);
  }
}

export async function adminCreateCompany({ data, update }) {
  try {
    const res = await axios({
      url: "/api/admin/company/create-company",
      method: "POST",
      data,
    });
    update();
    toast.success(res.data?.message ? res.data?.message : "Company created");
  } catch (error) {
    toast.error(
      error?.response?.data?.message
        ? error?.response?.data?.message
        : "Something went wrong! Please, try again later"
    );
  }
}

export async function adminCreateUser({ data, update }) {
  try {
    const res = await axios({
      url: "/api/admin/user/create-admin",
      method: "POST",
      data,
    });
    update();
    toast.success(res.data?.message ? res.data?.message : "User created");
  } catch (error) {
    console.log(error);
    toast.error(
      error?.response?.data?.message
        ? error?.response?.data?.message
        : "Something went wrong! Please, try again later"
    );
  }
}

export async function getRecentUploads() {
  try {
    const result = await axios.get("/api/user/last-uploads", {
      withCredentials: true,
    });
    return result.data;
  } catch (error) {
    console.log(error);
  }
}

export async function updateUserOldPassword(data) {
  try {
    const res = await axios({
      url: "/api/user/profile-password",
      method: "POST",
      data,
    });
    toast.success(res.data?.message ? res.data?.message : "User created");
  } catch (error) {
    toast.error(
      error?.response?.data?.message
        ? error?.response?.data?.message
        : "Something went wrong! Please, try again later"
    );
  }
}

export async function getTotalStats(query) {
  try {
    const result = await axios.get(
      `/api/admin/user/statistics?filter=${query?.filter}&&personal=${query?.personal}`,
      {
        withCredentials: true,
      }
    );
    return result.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getOverView(query) {
  try {
    const result = await axios({
      url: "/api/admin/user/multi-statistics",
      method: "GET",
      params: query,
    });
    return result.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getCategoriesList() {
  try {
    const result = await axios.get("/api/admin/categories", {
      withCredentials: true,
    });
    return result.data;
  } catch (error) {
    console.log(error);
  }
}
