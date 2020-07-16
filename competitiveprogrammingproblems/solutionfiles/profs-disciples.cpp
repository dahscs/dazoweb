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

int main()
{
	ios_base::sync_with_stdio(false);
	cin.tie(0);cout.tie(0);
	int t;
	cin>>t;
	while(t-->0)
	{
		int n;
		cin>>n;
		int children[n]{};
		int parent[n];
		for(int i=1;i<n;i++) cin>>parent[i];
		for(int i=n-1;i>0;i--) children[parent[i]]+=1+children[i];
		for(int i=0;i<n;i++) cout<<children[i]<<" ";
		cout<<"\n";
	}
	return 0;
}
