import axios from 'axios';
import toast from 'react-hot-toast';


export async function sendPasswordRecoveryEmail({ email, router, helpers }) {
  const accessToken = window.localStorage.getItem("token");
  try {
    await axios.post(`${process.env.NEXT_PUBLIC_API}/api/user/send-email`, {
      email,
    });

        router.push('/authentication/recovery-success');
    } catch (error) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: error.message });
        helpers.setSubmitting(false);
        toast.error(
            error?.response?.data?.message
                ? error?.response?.data?.message
                : 'Something went wrong! Please, try again later'
        );
    }
}

export async function updateUserPassword({
    new_password,
    router,
    helpers,
    auth,
}) {
  const accessToken = window.localStorage.getItem("token");
  try {
    await axios({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_API}/api/user/update-password`,
      headers: { auth: accessToken },
      data: { new_password },
    });

        router.push('/authentication/reset-success');
    } catch (error) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: error.message });
        helpers.setSubmitting(false);
        toast.error(
            error?.response?.data?.message
                ? error?.response?.data?.message
                : 'Something went wrong! Please, try again later'
        );
    }
}

export async function getUploadedFileResults({ data, update }) {
  const accessToken = window.localStorage.getItem("token");
  try {
    const result = await axios({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_API}/api/user/upload-file`,
      data: data,
      headers: { auth: accessToken },
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
  const accessToken = window.localStorage.getItem("token");
  try {
    const result = await axios.get(
      `${process.env.NEXT_PUBLIC_API}/api/user/profile`,
      {
        withCredentials: true,
        headers: { auth: accessToken },
      }
    );
    return result.data;
  } catch (error) {
    console.log(error);
  }
}

export async function editUserProfile() {}

export async function getUsersPfofiles() {
  const accessToken = window.localStorage.getItem("token");
  try {
    const result = await axios.get(
      `${process.env.NEXT_PUBLIC_API}/api/admin/user/all-users`,
      {
        withCredentials: true,
        headers: { auth: accessToken },
      }
    );
    return result.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getAllCompanyReports() {
  const accessToken = window.localStorage.getItem("token");
  try {
    const result = await axios.get(
      `${process.env.NEXT_PUBLIC_API}/api/user/reports`,
      {
        withCredentials: true,
        headers: { auth: accessToken },
      }
    );
    return result.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getCategoryData({ id, category }) {
  const accessToken = window.localStorage.getItem("token");
  try {
    const result = await axios.get(
      `${process.env.NEXT_PUBLIC_API}/api/user/filtered-reports/${id}?category=${category}`,
      {
        withCredentials: true,
        headers: { auth: accessToken },
      }
    );
    return result.data;
  } catch (error) {
    console.log(error);
  }
}

export async function inviteCompanyUser({ data, handleClose, resetForm }) {
  const accessToken = window.localStorage.getItem("token");
  try {
    const res = await axios({
      url: `${process.env.NEXT_PUBLIC_API}/api/user/add-user`,
      method: "POST",
      data,
      headers: { auth: accessToken },
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
  const accessToken = window.localStorage.getItem("token");
  try {
    await axios({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_API}/api/user/confirmation`,
      headers: { auth },
      data: { password: new_password },
      headers: { auth: accessToken },
    });

        router.push('/authentication/conformation-success');
    } catch (error) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: error.message });
        helpers.setSubmitting(false);
        toast.error(
            error?.response?.data?.message
                ? error?.response?.data?.message
                : 'Something went wrong! Please, try again later'
        );
    }
}

export async function getCompaniesListAll() {
  const accessToken = window.localStorage.getItem("token");
  try {
    const result = await axios.get(
      `${process.env.NEXT_PUBLIC_API}/api/admin/company/all`,
      {
        withCredentials: true,
        headers: { auth: accessToken },
      }
    );
    return result.data;
  } catch (error) {
    console.log(error);
  }
}

export async function adminCreateCompany({ data, update }) {
  const accessToken = window.localStorage.getItem("token");
  try {
    const res = await axios({
      url: `${process.env.NEXT_PUBLIC_API}/api/admin/company/create-company`,
      method: "POST",
      data,
      headers: { auth: accessToken },
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
  const accessToken = window.localStorage.getItem("token");
  try {
    const res = await axios({
      url: `${process.env.NEXT_PUBLIC_API}/api/admin/user/create-admin`,
      method: "POST",
      data,
      headers: { auth: accessToken },
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
  const accessToken = window.localStorage.getItem("token");
  try {
    const result = await axios.get(
      `${process.env.NEXT_PUBLIC_API}/api/user/last-uploads`,
      {
        withCredentials: true,
        headers: { auth: accessToken },
      }
    );
    return result.data;
  } catch (error) {
    console.log(error);
  }
}

export async function updateUserOldPassword(data) {
  const accessToken = window.localStorage.getItem("token");
  try {
    const res = await axios({
      url: `${process.env.NEXT_PUBLIC_API}/api/user/profile-password`,
      method: "POST",
      data,
      headers: { auth: accessToken },
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
  const accessToken = window.localStorage.getItem("token");
  try {
    const result = await axios.get(
      `${process.env.NEXT_PUBLIC_API}/api/admin/user/statistics?filter=${query?.filter}&&personal=${query?.personal}`,
      {
        withCredentials: true,
        headers: { auth: accessToken },
      }
    );
    return result.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getOverView(query) {
  const accessToken = window.localStorage.getItem("token");
  try {
    const result = await axios({
      url: `${process.env.NEXT_PUBLIC_API}/api/admin/user/multi-statistics`,
      method: "GET",
      params: query,
      headers: { auth: accessToken },
    });
    return result.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getCategoriesList() {
  const accessToken = window.localStorage.getItem("token");
  try {
    const result = await axios.get(
      `${process.env.NEXT_PUBLIC_API}/api/admin/categories`,
      {
        withCredentials: true,
        headers: { auth: accessToken },
      }
    );
    return result.data;
  } catch (error) {
    console.log(error);
  }
}

export const useEmailAndPassowrdLogin = async (data) => {
  try {
    const res = await axios({
      url: `${process.env.NEXT_PUBLIC_API}/api/auth/login`,
      method: "POST",
      data,
    });
    localStorage.setItem("token", res?.data?.token?.token)
  } catch (error) {
    console.log(error);
  }
};
