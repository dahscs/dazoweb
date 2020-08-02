#include <iostream>

//Author: Evan Partidas

using namespace std;
typedef long long ll;

int main()
{
	ios_base::sync_with_stdio(false);
	cin.tie(0);cout.tie(0);
	int t;
	cin>>t;
	while(t-->0)
	{
		int n;
		ll k;
		cin>>n>>k;
		ll arr[2*n+1];
		arr[0]=0;
		for(int i=1;i<=n;i++)
		{
			cin>>arr[i];
			arr[i+n] = arr[i];
		}
		for(int i=1;i<=2*n;i++)
		{
			arr[i]+=arr[i-1];
		}
		int best = 0;
		int val = 0;
		for(int i=1;i<=n;i++)
		{
			int lo = i; //I typed out a binary search but it was possible to stick to the library function upper_bound()
			int hi = i+n;
			while(lo<hi)
			{
				int mid = (lo+hi)/2;
				if(arr[mid]-arr[i-1]<=k)
					lo = mid+1;
				else 
					hi = mid;
			}
			lo-=i;
			if(lo>val)
			{
				val = lo;
				best = i;
			}
		}
		for(int i=best;i<best+n;i++)
		{
			cout<<(arr[i]-arr[i-1])<<" ";
		}
		cout<<"\n";
	}
	return 0;
}
