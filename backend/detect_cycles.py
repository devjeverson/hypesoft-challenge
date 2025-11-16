#!/usr/bin/env python3
import os, xml.etree.ElementTree as ET
from collections import defaultdict, deque

root = "src"
graph = defaultdict(list)
proj_paths = {}

# collect csproj files
for dirpath, _, filenames in os.walk(root):
    for fn in filenames:
        if fn.endswith(".csproj"):
            p = os.path.join(dirpath, fn)
            proj_name = os.path.splitext(fn)[0]
            proj_paths[proj_name] = p

# parse ProjectReference
for name, p in proj_paths.items():
    try:
        tree = ET.parse(p)
        for pr in tree.findall(".//ProjectReference"):
            inc = pr.get("Include")
            if not inc: continue
            # normalize path and get referenced project name
            ref = os.path.basename(inc)
            ref_name = os.path.splitext(ref)[0]
            graph[name].append(ref_name)
    except Exception as e:
        print("error parsing", p, e)

# detect cycles via DFS
visited = {}
stack = []
cycles = []

def dfs(node):
    if visited.get(node) == 1:
        # back edge -> find cycle in stack
        if node in stack:
            idx = stack.index(node)
            cycles.append(stack[idx:] + [node])
        return
    if visited.get(node) == 2:
        return
    visited[node] = 1
    stack.append(node)
    for nbr in graph.get(node,[]):
        dfs(nbr)
    stack.pop()
    visited[node] = 2

for n in proj_paths.keys():
    if visited.get(n) is None:
        dfs(n)

if not cycles:
    print("No cycles detected.")
else:
    print("Cycles detected:")
    for c in cycles:
        print(" -> ".join(c))
