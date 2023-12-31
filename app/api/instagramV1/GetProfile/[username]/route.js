import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(request, params) {
    let pkid = null
    let Cookie = `csrftoken=qMnm1zIXv5ya68LtlTW3K1j97HrLP1ak; ds_user_id=4194047955; ig_did=AA0CC290-87E4-4092-A4A8-1C6EB8027033; ig_nrcb=1; mid=ZZDd2gAEAAHImhLtTGRJ8hLXCmPz; rur="NAO\\0544194047955\\0541735558505:01f702c93ee1bc01f4bb207f2e5d7c64c00e853f01c9945382cc0cd030fe4482dcd19aa4"`
    let Cookie2 = `mid=ZRPtcgALAAEDAGQk7WLUrh2Swwfi; ig_did=80336033-D0C0-4E82-80ED-15292D046510; ig_nrcb=1; fbm_124024574287414=base_domain=.instagram.com; datr=cO0TZdRVip5veg9qLN3ECbAi; ds_user_id=4194047955; csrftoken=CtRMjWzi8Uo7MeANz2nebJ0D46ELx5nH; dpr=1.25; shbid="1114\\0544194047955\\0541735528365:01f73d19808ce030c0905c4c5dde075bc2335fb23cc8a7806fc810fc36cb04838a734326"; shbts="1703992365\\0544194047955\\0541735528365:01f7105ba3d8c7b0c6be510ad0a1fadad89084774526fb8fca4afd9c0e54a73c68f13b5d"; sessionid=4194047955%3AuyI5frv7E89ZvG%3A10%3AAYcCYupzBtYieh-0E5H9vFBQSveaGKhPm3GKEXfzJw; fbsr_124024574287414=-QyprmBRd-929vPxFOHNKz6UFGc4uhZzqPopgnIfTqA...[rest of the cookie]...; rur="NAO\\0544194047955\\0541735528716:01f7e468279ac42970279630770bf6248a90d61917e435542631b532e2b8ee7714fbe5ff"`;

    try {
        const response = await axios.get(`https://www.instagram.com/api/v1/feed/user/${params.params.username}/username/`, {
            headers: {
                "Cookie": Cookie,
                "X-Ig-App-Id": 936619743392459
            }
        });
        const pkid = response?.data?.user?.pk_id;
        if (!pkid) {
            throw new Error("PK ID not found in response");
        }
        const ambilstory = await axios.get(`https://www.instagram.com/api/v1/feed/reels_media/?reel_ids=${pkid}`, {
            headers: {
                "Cookie": Cookie2,
                "X-Ig-App-Id": 936619743392459
            }
        });
        return NextResponse.json({ snapdata: ambilstory.data, data: response.data });
    } catch (error) {
        console.error(`Error:`, error.response ? error.response.data : error.message);
        return NextResponse.json({ error: 'Error fetching data', details: error.response ? error.response.data : error.message });
    }
}