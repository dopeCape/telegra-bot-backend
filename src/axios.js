import axios from "axios";

export const instance = axios.create({
  baseURL: "https://amazon-pricing-and-product-info.p.rapidapi.com/'",
  headers: {
    "content-type": "application/octet-stream",
    "X-RapidAPI-Key": "e12d830d05msh9d93ea25be97751p100e30jsnf6d18a9946ea",
    "X-RapidAPI-Host": "amazon-pricing-and-product-info.p.rapidapi.com",
  },
});
