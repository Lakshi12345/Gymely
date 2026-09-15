import api from "./api";

export const getSettings = () => {
    return api.get("/settings");
};

export const updateGeneralSettings = (data: GeneralSettings) => {
    return api.put("/settings/general", data);
};

export const updateBranding = (data: BrandingSettings) => {
    return api.put("/settings/branding", data);
};

export const updateBusiness = (data: BusinessSettings) => {
    return api.put("/settings/business", data);
};

export const updateSecurity = (data: SecuritySettings) => {
    return api.put("/settings/security", data);
};
