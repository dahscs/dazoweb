#include <iostream>

//Author: Evan Partidas

using namespace std;
typedef long long ll;

int countbits(ll n){
	int ret = 0;
	while(n){
		ret++;
		n-=n&-n;
	}
	return ret;
}

int main(){
	ios_base::sync_with_stdio(false);
	cin.tie(0);cout.tie(0);
	int N;
	cin>>N;
	while(N-->0){
		ll a;
		cin>>a;
		cout<<countbits(a)<<"\n";
	}
	return 0;
}
