"use client";
import axios, { AxiosInstance } from "axios";

import getSearchTicket from "./zendesk/getSearchTicket";
import getUserByEmail from "./users/getUserByEmail";
import loginUsingOtp from "./users/loginUsingOtp";
import listAllUsers from "./users/listAllUsers";
import listAllPositions from "./positions/positionList";
import createUser from "./users/createUser";
import listIncidentReportStatus from "./annoucements/incidentReports/listIncidentReportStatus";
import listIncidentReports from "./annoucements/incidentReports/listIncidentReports";
import createIncidentReport from "./annoucements/incidentReports/createIncidentReport";
import unlockUser from "./users/unlockAccount";
import listAllRecipients from "./recipients/listRecipients";
import bulkUploadUsers from "./users/bulkUploadUsers";
import listRatings from "./annoucements/incidentReports/listRatings";
import listAllEmployeeType from "./employeeType/employeeTypeList";
import listAllPrograms from "./programs/programList";
import listAllDirectReports from "./direct-report/direct-report";
import listAllGwsUsers from "./gws/listAllUsers";
import saveBulkUploadUsers from "./users/saveBulkUsers";
import listAuditLogs from "./audit-logs/list";
import createLogs from "./audit-logs/create";
import unlockAccountOtp from "./users/unlockAccountOTP";
import createPosition from "./positions/positionCreate";

export const createClient = (baseURL: string) => {
  const apiClient = axios.create({
    baseURL,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  return apiClient;
};

export class AxiosClient {
  public client: AxiosInstance;
  private static instance: AxiosClient;
  constructor(baseURL: string) {
    this.client = createClient(baseURL);
  }

  public static async getInstance(baseURL: any) {
    if (AxiosClient.instance) {
      return AxiosClient.instance;
    }

    const instance = new this(baseURL);
    Object.freeze(instance);
    AxiosClient.instance = instance;
    return AxiosClient.instance;
  }
}

const apiService = () => {
  return Object.freeze({
    getSearchTicket,
    getUserByEmail,
    loginUsingOtp,
    listAllUsers,
    listAllPositions,
    createUser,
    listIncidentReportStatus,
    listIncidentReports,
    createIncidentReport,
    unlockUser,
    listAllRecipients,
    bulkUploadUsers,
    listRatings,
    listAllEmployeeType,
    listAllPrograms,
    listAllDirectReports,
    listAllGwsUsers,
    saveBulkUploadUsers,
    listAuditLogs,
    createLogs,
    unlockAccountOtp,
    createPosition,
  });
};

export default apiService;
