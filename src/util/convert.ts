'use strict'
import { DocumentSymbol, SymbolKind } from 'vscode-languageserver-types'

export function filterGlobalSymbol(symbol: DocumentSymbol): boolean {
  return symbol.kind != SymbolKind.Property && !symbol.name.startsWith('_')
}

export function filterLocalSymbols(symbol: DocumentSymbol): DocumentSymbol[] {
  const targets: SymbolKind[] = [
    SymbolKind.Constructor,
    SymbolKind.Enum,
    SymbolKind.Function,
    SymbolKind.Interface,
    SymbolKind.Method,
    SymbolKind.Property,
    SymbolKind.Variable,
  ]
  const excluded: SymbolKind[] = [
    SymbolKind.Array,
    SymbolKind.Boolean,
    SymbolKind.Constant,
    SymbolKind.Function,
    SymbolKind.Object,
    SymbolKind.Package,
    SymbolKind.Property,
    SymbolKind.Variable,
  ]
  if (!targets.includes(symbol.kind)) {
    return symbol.children.filter(child => {
      return !child.name.startsWith('_')
    }).map(
    child => {
      return {
        ...child,
        name: child.name.replace(/\(get\) |\(set\) /, ''),
      }
    }
    )
  }
  return symbol.children.filter(child => {
    return !excluded.includes(child.kind)
  })
}

export function getSymbolKindWeight(kind: SymbolKind): number {
  switch (kind) {
    case SymbolKind.Class:
      return -100
    case SymbolKind.Constructor:
      return -99
    case SymbolKind.Property:
      return -98
    case SymbolKind.Method:
      return -97
    case SymbolKind.Interface:
      return -96
    case SymbolKind.Function:
      return -95
    case SymbolKind.Enum:
      return -94
    default:
      return kind
  }
}

export function getSymbolKind(kind: SymbolKind): string {
  switch (kind) {
    case SymbolKind.File:
      return 'File'
    case SymbolKind.Module:
      return 'Module'
    case SymbolKind.Namespace:
      return 'Namespace'
    case SymbolKind.Package:
      return 'Package'
    case SymbolKind.Class:
      return 'Class'
    case SymbolKind.Method:
      return 'Method'
    case SymbolKind.Property:
      return 'Property'
    case SymbolKind.Field:
      return 'Field'
    case SymbolKind.Constructor:
      return 'Constructor'
    case SymbolKind.Enum:
      return 'Enum'
    case SymbolKind.Interface:
      return 'Interface'
    case SymbolKind.Function:
      return 'Function'
    case SymbolKind.Variable:
      return 'Variable'
    case SymbolKind.Constant:
      return 'Constant'
    case SymbolKind.String:
      return 'String'
    case SymbolKind.Number:
      return 'Number'
    case SymbolKind.Boolean:
      return 'Boolean'
    case SymbolKind.Array:
      return 'Array'
    case SymbolKind.Object:
      return 'Object'
    case SymbolKind.Key:
      return 'Key'
    case SymbolKind.Null:
      return 'Null'
    case SymbolKind.EnumMember:
      return 'EnumMember'
    case SymbolKind.Struct:
      return 'Struct'
    case SymbolKind.Event:
      return 'Event'
    case SymbolKind.Operator:
      return 'Operator'
    case SymbolKind.TypeParameter:
      return 'TypeParameter'
    default:
      return 'Unknown'
  }
}
