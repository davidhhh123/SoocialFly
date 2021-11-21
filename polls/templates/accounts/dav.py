"""
def text_to_bits(text, encoding='utf-8', errors='surrogatepass'):
    bits = bin(int.from_bytes(text.encode(encoding, errors), 'big'))[2:]
    return bits.zfill(8 * ((len(bits) + 7) // 8))

text = "ABCDEFGH"
b = text_to_bits(text)

print("bit",b)
l = text_to_bits(text)
k = ""
t = 0
e = ""
for i in range(int(len(l)/2)):
	if t+1 < len(l) and t <len(l):

		#print(l[t], t, len(l))

		if l[t]=="0" and  l[t+1]=="0":
			k+="0"
		elif l[t]=="0" and l[t+1]=="1":
			k+="1"
		
		elif l[t]=="1" and l[t+1]=="0":
			k+="&"

		elif l[t]=="1" and l[t+1]=="1":
			k+="2"	
		if t+2 <= len(l)-1:

			t+=2
		


		

			
				

print(k, len(l), len(k))

for i in range(len(k)):
	

		

		if k[i]=="0":
			e+="00"
		elif k[i]=="1":
			e+="01"
		
		elif k[i]=="&":
			e+="10"

		
#print(e)

"""
#import math 
#from geoip import geolite2

#match = geolite2.lookup('83.139.25.117')



"""
my = [0, 1,4,5,6,7,2,1,6,7,9,0,5,4,3,2,1,2,4,6,7,8,9]

tot = [1, 1,5,6,1,3,6,5,7,8,4,3,2,1,0,0,0,4,2,3,0,7,5]
print(len(my), len(tot))
sumx = 0
sumy = 0
sumtot = 0
for i in range(len(my)):
	sumx += my[i]*my[i]
	sumy += tot[i]*tot[i] 
	
	sumtot += my[i]*tot[i]










cos_xy = sumtot/(math.sqrt(sumx)*math.sqrt(sumy))
print(cos_xy, sumtot, sumx, sumy)

""" 
"""
import numpy as np

# Example data
A = np.random.random([2, 3])
B = np.random.random([1000, 200])
print(A)

# There may be a proper numpy method for this function, but it won't be much faster.
def normalise(A):
    lengths = (A**2).sum(axis=1, keepdims=True)**.5
    return A/lengths

A = normalise(A)
B = normalise(B)

results = []

rows_in_slice = 100

slice_start = 0
slice_end = slice_start + rows_in_slice

while slice_end <= A.shape[0]:

    results.append(A[slice_start:slice_end].dot(B.T).max(axis=1))

    slice_start += rows_in_slice
    slice_end = slice_start + rows_in_slice

result = np.concatenate(results)
print(result)


t = [0,1,2,3,4,5]
k=0
for x in t[:]:
	print(len(t))
	if x==0:
		t.remove(x)
		k+=1


print(t)
"""





	

	
		



from numba import jit

@jit
def f(n):
    s = 0.
    for i in range(n):
        s += i
    return s


print(f(9999999))