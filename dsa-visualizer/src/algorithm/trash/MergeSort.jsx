// Merge Sort
/*
void merge(vector<int>&arr,int l,int m,int r){
int n1=m-l+1;
int n2=r-m;
vector<int>L(n1),R(n2);
for(int i=0;i<n1;i++){
L[i]=arr[l+i];
}
for(int i=0;i<n2;i++){
R[i]=arr[m+1+i];
}
int i=0,j=0;
int k=l;
while(i<n1 && j<n2){
if(L[i]<=R[j]){
arr[k]=L[i];
i++;
}else{
  arr[k]=R[j];
j++;
  }
k++;
}
while(i<n1)
arr[k++]=L[i++];
while(j<n2)
arr[k++]=R[j++];
}

void mergeSort(vector<int>&arr,int l,int r){
if(l>=r) return;

int m=l+(r-l)/2;
mergeSort(arr,l,m);
mergeSort(arr,m+1,r);
merge(arr,l,m,r);
}
*/

export const MergeSort = (arr) => {
  const animations = [];
  if (arr.length <= 1) return animations;

  const auxiliary = arr.slice(); //copy of original array
  const sorted = arr.slice();

  mergeSortHelper(sorted, 0, sorted.length - 1, auxiliary, animations);
  return animations;
};

const mergeSortHelper = (sorted, startIdx, endIdx, auxiliary, animations) => {
  if (startIdx === endIdx) return; //single element

  const midIdx = Math.floor((startIdx + endIdx) / 2);

  mergeSortHelper(auxiliary, startIdx, midIdx, sorted, animations);
  mergeSortHelper(auxiliary, midIdx + 1, endIdx, sorted, animations);
  merge(sorted, startIdx, midIdx, endIdx, auxiliary, animations);
};

const merge = (sorted, startIdx, midIdx, endIdx, auxiliary, animations) => {
  let k = startIdx; //
  let i = startIdx;
  let j = midIdx + 1;

  while (i <= midIdx && j <= endIdx) {
    animations.push([i, j]); //highlight
    animations.push([i, j]); //unhighlight

    if (auxiliary[i] <= auxiliary[j]) {
      animations.push([k, auxiliary[i]]); //overwrite at position k
      sorted[k++] = auxiliary[i++]; //actually write value
    } else {
      animations.push([k, auxiliary[j]]);
      sorted[k++] = auxiliary[j++];
    }
  }
  while (i <= midIdx) {
    animations.push([i, i]); //Highlight
    animations.push([i, i]); //revert back colours
    animations.push([k, auxiliary[i]]); //overwrite height=value
    sorted[k++] = auxiliary[i++];
  }
  while (j <= endIdx) {
    animations.push([j, j]);
    animations.push([j, j]);
    animations.push([k, auxiliary[j]]);
    sorted[k++] = auxiliary[j++];
  }
};
