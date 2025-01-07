export const CustomerService = {
  getData() {
    return [
      {
        id: 1000,
        jobTitle:
          "James Butt James Butt James Butt James Butt James Butt James ButtJames Butt",
        status: "Assigned",
        budget: "100",
        postedDate: "2015-09-13",
        deadline: "2019-02-09",
        engChecked: true,
      },
      {
        id: 1001,
        jobTitle: "Josephine Darakjy",
        status: "Pending Assignment",
        budget: "20",
        postedDate: "2019-02-09",
        deadline: "",
        engChecked: true,
      },
      {
        id: 1002,
        jobTitle: "Art Venere",
        status: "Pending Assignment",
        budget: "300",
        postedDate: "2017-05-13",
        deadline: "2019-02-09",
        engChecked: false,
      },
    ];
  },

  getCustomersSmall() {
    return Promise.resolve(this.getData().slice(0, 10));
  },

  getCustomersMedium() {
    return Promise.resolve(this.getData().slice(0, 50));
  },

  getCustomersLarge() {
    return Promise.resolve(this.getData().slice(0, 200));
  },

  getCustomersXLarge() {
    return Promise.resolve(this.getData());
  },

  getCustomers(params) {
    const queryParams = params
      ? Object.keys(params)
          .map(
            (k) => encodeURIComponent(k) + "=" + encodeURIComponent(params[k])
          )
          .join("&")
      : "";

    return fetch(
      "https://www.primefaces.org/data/customers?" + queryParams
    ).then((res) => res.json());
  },
};
