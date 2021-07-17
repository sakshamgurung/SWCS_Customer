export const UtilActionUrl = {
  verify: () => `/verify`,
};

export const AccountUrl = {
  signup: role => `/${role}/sign-up`,
  login: role => `/${role}/login`,
  logout: role => `/${role}/logout`,
};

export const CustomerUsedGeoObjectUrl = {
  getById: id => `/customer-used-geo-objects/${id}`,
  getByRef: (ref, id) => `/customer-used-geo-objects/${ref}/${id}`,
};

export const CustomerRequestUrl = {
  post: () => `/customers/customer-requests`,
  getAll: (role, id) => `/${role}/${id}/customer-requests`,
  getById: id => `/customer-requests/${id}`,
  getByRef: (ref, id) => `/customer-requests/${ref}/${id}`,
  put: id => `/customer-requests/${id}`,
  delete: id => `/customer-requests/${id}`,
};

export const CustomerUrl = {
  post: () => `/customers`,
  getAll: type => `/customers/${type}`, //idArray[] of customer
  getById: (type, id) => `/customers/${type}/${id}`,
  getByRef: (type, ref, id) => `/customers/${type}/${ref}/${id}`,
  put: (type, id) => `/customers/${type}/${id}`,
  delete: id => `/customers/${id}`,
};

export const SubscriptionUrl = {
  post: () => `/subscriptions`,
  getSubscription: id => `/subscriptions/customer/${id}`,
  getSubscriber: id => `/subscriptions/company/${id}`,
  delete: id => `/subscriptions/${id}`,
};

export const NotificationUrl = {
  getAll: (role, id) => `/${role}/${id}/notifications`,
  getById: id => `/notifications/${id}`,
  delete: id => `/notifications/${id}`,
};

export const ScheduleUrl = {
  getAll: id => `/customers/${id}/schedules`,
  getById: id => `/schedules/${id}`,
  getByRef: (ref, id) => `/schedules/${ref}/${id}`,
};

export const CompanyUrl = {
  post: () => `/companies`,
  getAll: type => `/companies/${type}`,
  getById: (type, id) => `/companies/${type}/${id}`,
  getByRef: (type, ref, id) => `/companies/${type}/${ref}/${id}`,
  put: (type, id) => `/companies/${type}/${id}`,
  delete: id => `/companies/${id}`,
};

export const GeoObjectUrl = {
  post: type => `/companies/geo-objects/${type}`,
  getAll: (id, type) => `/companies/${id}/geo-objects/${type}`,
  getById: (id, type) => `/geo-objects/${type}/${id}`,
  getByRef: (type, ref, id) => `/geo-objects/${type}/${ref}/${id}`,
  put: (type, id) => `/geo-objects/${type}/${id}`,
  delete: (type, id) => `/geo-objects/${type}/${id}`,
};

export const WorkUrl = {
  post: () => `/companies/works`,
  getAll: (role, id) => `/${role}/${id}/works`,
  getById: id => `/works/${id}`,
  getByRef: (ref, id) => `/works/${ref}/${id}`,
  put: id => `/works/${id}`,
  delete: id => `/works/${id}`,
};

export const WasteDumpUrl = {
  post: () => `/customers/waste-dump`,
  getById: id => `/waste-dump/${id}`,
  getByRef: (ref, id) => `/waste-dump/${ref}/${id}`,
  put: id => `/waste-dump/${id}`,
  delete: id => `/waste-dump/${id}`,
};

export const WasteListUrl = {
  post: () => `/companies/waste-list`,
  getAll: id => `/companies/${id}/waste-list`,
  getById: id => `/waste-list/${id}`,
  getByRef: (ref, id) => `/waste-list/${ref}/${id}`,
  put: id => `/waste-list/${id}`,
  delete: id => `/waste-list/${id}`,
};

export const WasteCatalogUrl = {
  post: () => `/waste-catalogs`,
  getAll: () => `/waste-catalogs`,
  getById: id => `/waste-catalogs/${id}`,
  put: id => `/waste-catalogs/${id}`,
  delete: id => `/waste-catalogs/${id}`,
};
