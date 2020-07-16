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
	int n,m;
	cin>>n>>m;
	int a[n],b[m];
	for(int i=0;i<n;i++) cin>>a[i];
	for(int i=0;i<m;i++) cin>>b[i];
	for(int i=1;i<n;i++) a[i]+=a[i-1];
	for(int i=1;i<m;i++) b[i]+=b[i-1];
	sort(a,a+n);
	sort(b,b+m);
	int ret = abs(a[0]-b[0]);
	debug<<imie(ret)<<endl;
	int i=0;
	int j=0;
	while(i<n&&j<m)
	{
		ret = min(ret,abs(a[i]-b[j]));
		if(a[i]<b[j]) i++;
		else j++;
	}
	cout<<ret<<endl;
	return 0;
}
