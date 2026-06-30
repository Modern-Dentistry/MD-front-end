const BASE_URL = 'http://83.171.249.199:5555/api/v1';

const parseFDINumber = (toothNo) => {
  const t = Number(toothNo);
  if (t >= 11 && t <= 18) return { type: "ADULT", location: "TOP_RIGHT", num: t - 10 };
  if (t >= 21 && t <= 28) return { type: "ADULT", location: "TOP_LEFT", num: t - 20 };
  if (t >= 31 && t <= 38) return { type: "ADULT", location: "BOTTOM_LEFT", num: t - 30 };
  if (t >= 41 && t <= 48) return { type: "ADULT", location: "BOTTOM_RIGHT", num: t - 40 };
  if (t >= 51 && t <= 55) return { type: "CHILD", location: "TOP_RIGHT", num: t - 50 };
  if (t >= 61 && t <= 65) return { type: "CHILD", location: "TOP_LEFT", num: t - 60 };
  if (t >= 71 && t <= 75) return { type: "CHILD", location: "BOTTOM_LEFT", num: t - 70 };
  if (t >= 81 && t <= 85) return { type: "CHILD", location: "BOTTOM_RIGHT", num: t - 80 };
  return null;
};

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

    // Load fresh teeth from DB
    const teethRes = await fetch(`${BASE_URL}/teeth/read`, { headers });
    const currentDbTeeth = await teethRes.json();

    // Selected tooth numbers to examine
    const selectedTeeth = [85, 74]; // 85 exists, 74 is new (child lower left 4th)

    console.log('--- Teeth Examination Simulation Flow ---');
    for (const toothNo of selectedTeeth) {
      console.log(`Processing tooth: ${toothNo}`);
      let dbTooth = currentDbTeeth.find((t) => Number(t.toothNo) === Number(toothNo));

      if (!dbTooth) {
        console.log(`Tooth ${toothNo} not found in DB. Auto-creating...`);
        const parsed = parseFDINumber(toothNo);
        if (!parsed) {
          throw new Error(`Invalid tooth number: ${toothNo}`);
        }
        
        // Call /teeth/create
        const createRes = await fetch(`${BASE_URL}/teeth/create`, {
          method: 'POST',
          headers,
          body: JSON.stringify({
            toothNo: Number(toothNo),
            toothType: parsed.type,
            toothLocation: parsed.location
          })
        });
        
        if (createRes.status !== 200 && createRes.status !== 201) {
          throw new Error(`Failed to create tooth ${toothNo}: ${createRes.status}`);
        }
        console.log(`Tooth ${toothNo} created successfully!`);

        // Fetch all teeth again to get the new tooth with its database ID
        const teethRefreshedRes = await fetch(`${BASE_URL}/teeth/read`, { headers });
        const refreshedTeeth = await teethRefreshedRes.json();
        dbTooth = refreshedTeeth.find((t) => Number(t.toothNo) === Number(toothNo));
      }

      console.log(`Tooth database ID: ${dbTooth.id}`);

      // Now create examination
      console.log(`Creating teeth examination for teethId: ${dbTooth.id}`);
      const examRes = await fetch(`${BASE_URL}/teeth-examination/create`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          teethId: dbTooth.id,
          examinationId: 1, // Assume 1 is valid
          status: 'ACTIVE'
        })
      });
      console.log(`Teeth Examination Create Status: ${examRes.status}`);
      console.log(`Response:`, await examRes.json());
    }

  } catch (err) {
    console.error('Error:', err);
  }
}

main();
