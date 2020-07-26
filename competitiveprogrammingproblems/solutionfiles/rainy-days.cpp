#include <iostream>

//Author: Evan Partidas

using namespace std;
typedef long double ld;
int main()
{
	ios_base::sync_with_stdio(false);
	cin.tie(0);cout.tie(0);
	cout<<std::setprecision(8)<<std::fixed;
	int t;
	cin>>t;
	while(t-->0)
	{
		ld S,M;
		int D;
		cin>>S>>M>>D;
		ld dp[D]{};
		for(int i=0;i<D;i++)
		{
			dp[i]+=S;
			dp[i+1]+=M*dp[i];
		}
		cout<<dp[D-1]<<"\n";
	}
	return 0;
}
