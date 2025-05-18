const BASE_URL = 'https://frontend-take-home-service.fetch.com';

export const login = async (name, email) => {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email }),
    credentials: 'include',
  });

  if (!response.ok) {
    let message = 'Login failed';
    try {
      const errorData = await response.json();
      message = errorData.message || message;
    } catch {
      try {
        message = await response.text();
      } catch (_) {
        // ignore
      }
    }
    throw new Error(message);
  }

  const text = await response.text();
  return text;
};

export const logout = async () => {
  try {
    const response = await fetch(`${BASE_URL}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || 'Logout failed');
    }

    return true;
  } catch (error) {
    console.error('Error in logout:', error);
    throw error;
  }
};

export const getBreeds = async () => {
  try {
    const response = await fetch(`${BASE_URL}/dogs/breeds`, {
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || 'Failed to fetch breeds');
    }

    return await response.json();
  } catch (error) {
    console.error('Error in getBreeds:', error);
    throw error;
  }
};

export const searchDogs = async (params = {}) => {
  const queryParams = new URLSearchParams();

  // Default size to 25 if not provided
  if (!params.size) {
    params.size = 25;
  }

  for (const key in params) {
    const value = params[key];
    if (Array.isArray(value)) {
      value.forEach(item => queryParams.append(key, item));
    } else if (value !== undefined && value !== null) {
      queryParams.append(key, value);
    }
  }

  try {
    const response = await fetch(`${BASE_URL}/dogs/search?${queryParams.toString()}`, {
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || 'Failed to search dogs');
    }

    return await response.json();
  } catch (error) {
    console.error('Error in searchDogs:', error);
    throw error;
  }
};

export const getDogDetails = async (ids) => {
  try {
    const response = await fetch(`${BASE_URL}/dogs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ids),
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || 'Failed to get dog details');
    }

    return await response.json();
  } catch (error) {
    console.error('Error in getDogDetails:', error);
    throw error;
  }
};

export const generateMatch = async (favoriteDogIds) => {
  try {
    const response = await fetch(`${BASE_URL}/dogs/match`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(favoriteDogIds),
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || 'Failed to generate match');
    }

    return await response.json();
  } catch (error) {
    console.error('Error in generateMatch:', error);
    throw error;
  }
};