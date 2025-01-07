import { TOAST_SERVICE } from "@/utils";

export const RESPONSE = () => {
  const TOAST = TOAST_SERVICE();

  const setup = async ({
    apiFunction = () => {
      return { data: null };
    },
    toast = { isShow: false, type: "", msg: "" },
    isLoading = true,
  }) => {
    if (isLoading) {
      // StoreApp().onActionIsLoading(true);
    }

    let result = null;

    try {
      const response = await apiFunction;
      console.log(response);

      result = response; // Trả về toàn bộ response

      if (toast.isShow) {
        switch (toast.type) {
          case "POPUP":
            // StoreApp().onActionShowNotification(...)
            break;
          default:
            // TOAST.success(toast.msg || "Data fetched successfully");
            break;
        }
      }
    } catch (error) {
      console.log("sbc");
      console.log(error);

      if (error?.response?.data?.message) {
        result = error.response;

        if (toast.isShow) {
          TOAST.error(error.response.data.message);
        }
      } else {
        TOAST.error(error.message || "Unknown error occurred");
      }
    } finally {
      // if (isLoading) StoreApp().onActionIsLoading(false);
    }

    return result; // Trả về toàn bộ response
  };

  return { setup };
};
