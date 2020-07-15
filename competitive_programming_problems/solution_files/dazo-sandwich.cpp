#include <iostream>
#include <fstream>
#include <math.h>
#include <string.h>
#include <algorithm>
#include <vector>
#include <set>
#include <queue>
#include <map>


#define imie(r...) "[" #r ": " << (r) << "] "
#define debug (cout << __FUNCTION__ << "#" << __LINE__ << ": ")

using namespace std;
typedef long long ll;

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
