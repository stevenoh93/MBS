import os
import datetime as dt

def quote(s):
    return "\'" + s + "\'"

def buildFormatString(v, f):
    return "{v: " + v + ", f: "+ quote(f) + "}"

def getValue(f):
    return f[3:].replace(",", "")

with open("rawIncome.csv", "r") as f:
    with open("out", "w") as o:
        for line in f:
            splitLine = line.split("\t")
            date = dt.datetime.strptime(splitLine[0], '%m/%d/%Y')
            f = splitLine[2]
            v = getValue(f)
            out = ",".join([
                quote(date.strftime("%Y/%m/%d")), \
                quote(splitLine[1]), \
                buildFormatString(v, f),
                quote(splitLine[3][:-2])])
            o.write("[" + out + "]," + '\n')
            print out
