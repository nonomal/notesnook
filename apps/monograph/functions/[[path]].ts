/*
This file is part of the Notesnook project (https://notesnook.com/)

Copyright (C) 2023 Streetwriters (Private) Limited

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
import { createPagesFunctionHandler } from "@remix-run/cloudflare-pages";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error - the server build file is generated by `remix vite:build`
import * as build from "../build/server";

export const onRequest = createPagesFunctionHandler({ build });