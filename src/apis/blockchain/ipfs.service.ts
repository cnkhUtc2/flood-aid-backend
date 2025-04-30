import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class IpfsService {
    private readonly jwtToken =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJjYWJiODQwNC00N2VjLTRkNjQtOGMxOS1kYWVkMTg1YTFmNjkiLCJlbWFpbCI6InBoYW5kdWNhbjE0N0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJGUkExIn0seyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJOWUMxIn1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiNmYxOWMyYThhZGJhNjg3NTMxYjciLCJzY29wZWRLZXlTZWNyZXQiOiI3NzNlNzc4ODM0YWFmMTI5Y2U5NmJjNDVhNmE4Y2E3Mzk2YWI4OGNhOWVjODgzMzJjNTg3MjEyODk1NmU2NTU4IiwiZXhwIjoxNzc2NzAzMjAzfQ.6z78N_HepZCyScziJinLeQYJzOPVq4rDBJZfAh_PPtw';

    async uploadJSON(data: any): Promise<{ cid: string; url: string }> {
        try {
            const res = await axios.post(
                'https://api.pinata.cloud/pinning/pinJSONToIPFS',
                data,
                {
                    headers: {
                        Authorization: `Bearer ${this.jwtToken}`, // <-- FIXED
                        'Content-Type': 'application/json',
                    },
                },
            );

            const cid = res.data.IpfsHash;

            return {
                cid,
                url: `https://gateway.pinata.cloud/ipfs/${cid}`,
            };
        } catch (error) {
            console.error(
                'Pinata upload error:',
                error.response?.data || error.message,
            );
            throw new Error('Failed to upload to Pinata IPFS');
        }
    }
}
