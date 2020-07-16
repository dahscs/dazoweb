#include <iostream>
#include <fstream>
#include <math.h>

using namespace std;
typedef long long ll;

int main(){
	ios_base::sync_with_stdio(false);
	cin.tie(0);cout.tie(0);
	int N,Q;
	cin>>N>>Q;
	ll arr[N];
	for(int i=0;i<N;i++){
		cin>>arr[i];
		if(i)
			arr[i]+=arr[i-1];
	}
	for(int i=0;i<Q;i++){
		int K;
		cin>>K;
		int lo=0,hi=N;
		while(lo<hi){
			int mid = (lo+hi)/2;
			if(arr[mid]<K)
				lo = mid+1;
			else
				hi = mid;
		}
		cout<<lo<<endl;
	}
	return 0;
}
