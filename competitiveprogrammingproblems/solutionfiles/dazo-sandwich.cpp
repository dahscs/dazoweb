#include <iostream>

//Author: Evan Partidas

using namespace std;

int main(int argc,char** argv)
{
	ios_base::sync_with_stdio(false);
	cin.tie(0);cout.tie(0);
	int t;
	cin>>t;
	while(t-->0)
	{
		int a,b;
		cin>>a>>b;
		cout<<min(a/2,b)<<"\n";
	}
	return 0;
}
