/**
 * External Resource API Configuration
 * 
 * This file configures access to the external Rust-based resource microservice
 */

// API connection configuration
export const RESOURCE_API_URL = process.env.RESOURCE_API_URL || 'http://localhost:8000';

// Resource endpoints
export const API_ENDPOINTS = {
  RESOURCES: `${RESOURCE_API_URL}/resources`,
  TOGGLE_FAVORITE: (id: string) => `${RESOURCE_API_URL}/resources/${id}/favorite`
};
