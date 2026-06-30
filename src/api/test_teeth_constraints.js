const BASE_URL = 'http://83.171.249.199:5555/api/v1';

async function main() {
  try {
    console.log('Logging in...');
    const loginRes = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'super_admin', password: 'super1234' })
    });
    const authData = await loginRes.json();
    const token = authData.tokenPair?.accessToken;
    if (!token) {
      console.error('Login failed');
      return;
    }
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    // 1. Try to create toothNo: 6 for CHILD, BOTTOM_LEFT
    console.log('\nCreating: CHILD, BOTTOM_LEFT, 6');
    const res1 = await fetch(`${BASE_URL}/teeth/create`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        toothNo: 6,
        toothType: 'CHILD',
        toothLocation: 'BOTTOM_LEFT'
      })
    });
    console.log(`Response status: ${res1.status}`);
    if (res1.status !== 200) {
      console.log('Error content:', await res1.text());
    } else {
      console.log('Success!');
    }

    // 2. Try to create toothNo: 5 for ADULT, TOP_RIGHT (5 is already in DB as ADULT, BOTTOM_LEFT)
    console.log('\nCreating: ADULT, TOP_RIGHT, 5');
    const res2 = await fetch(`${BASE_URL}/teeth/create`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        toothNo: 5,
        toothType: 'ADULT',
        toothLocation: 'TOP_RIGHT'
      })
    });
    console.log(`Response status: ${res2.status}`);
    if (res2.status !== 200) {
      console.log('Error content:', await res2.text());
    } else {
      console.log('Success!');
    }

  } catch (err) {
    console.error('Error:', err);
  }
}

main();
