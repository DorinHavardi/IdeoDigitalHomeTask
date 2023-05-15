import Config from "react-native-config";

export const API_URL = `https://sheets.googleapis.com/v4/spreadsheets/${Config.SHEET_ID}/values/${Config.SHEET_NAME}?valueRenderOption=FORMATTED_VALUE&key=${Config.API_KEY}`;