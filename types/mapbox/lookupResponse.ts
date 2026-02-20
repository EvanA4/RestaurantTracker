export type MapBoxResponse = {
  type?: string;
  attribution?: string;
  features?: MapBoxFeature[];
  message?: {
    status_code: number;
    error: string;
    version: string;
    code: string;
  };
};

export type MapBoxFeature = {
  type: string;
  geometry: {
    coordinates: number[];
    type: string;
  };
  properties: {
    name: string;
    name_preferred?: string;
    mapbox_id: string;
    feature_type: string;
    address?: string;
    full_address?: string;
    place_formatted?: string;
    context: {
      country?: {
        name: string;
        country_code: string;
        country_code_alpha_3: string;
      };
      region?: {
        name: string;
        region_code: string;
        region_code_full: string;
      };
      postcode?: {
        id: string;
        name: string;
      };
      place?: {
        id: string;
        name: string;
      };
      address?: {
        name: string;
        address_number: string;
        street_name: string;
      };
      street?: {
        name: string;
      };
    };
    coordinates: {
      latitude: number;
      longitude: number;
      routable_points?: {
        name: string;
        latitude: number;
        longitude: number;
        note?: string;
      }[];
    };
    language?: string;
    maki?: string;
    poi_category?: string[];
    poi_category_ids?: string[];
    external_ids?: {
      dataplor: string;
    };
    metadata?: {
      phone?: string;
      website?: string;
      open_hours?: {
        periods: {
          open: {
            day: number;
            time: string;
          };
          close: {
            day: 0;
            time: string;
          };
        }[];
      };
    };
    distance?: number;
  };
};
