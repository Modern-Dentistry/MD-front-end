const BASE_URL = 'http://83.171.249.199:5555/api/v1';

async function main() {
  try {
    const loginRes = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'super_admin', password: 'super1234' })
    });
    const authData = await loginRes.json();
    const token = authData.tokenPair?.accessToken;
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    const teethToCreate = [
      { toothNo: 75, toothType: 'CHILD', toothLocation: 'BOTTOM_LEFT' },
      { toothNo: 85, toothType: 'CHILD', toothLocation: 'BOTTOM_RIGHT' },
      { toothNo: 65, toothType: 'CHILD', toothLocation: 'TOP_LEFT' },
      { toothNo: 55, toothType: 'CHILD', toothLocation: 'TOP_RIGHT' }
    ];

    console.log('--- FDI Tooth Creation Verification ---');
    for (const payload of teethToCreate) {
      console.log(`Creating: ${payload.toothType} ${payload.toothLocation} (FDI No: ${payload.toothNo})`);
      const res = await fetch(`${BASE_URL}/teeth/create`, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload)
      });
      console.log(`Status: ${res.status}`);
      const text = await res.text();
      try {
        const body = JSON.parse(text);
        console.log('Response:', body);
      } catch {
        console.log('Response (plain text):', text || '(empty)');
      }
    }

    // List all teeth to verify persistence
    const readRes = await fetch(`${BASE_URL}/teeth/read`, { headers });
    const teeth = await readRes.json();
    console.log('\nTotal teeth in database:', teeth.length);
    console.log('Teeth details:', teeth.map(t => ({ id: t.id, toothNo: t.toothNo, toothType: t.toothType, toothLocation: t.toothLocation })));

  } catch (err) {
    console.error('Error during verification:', err);
  }
}

main();
