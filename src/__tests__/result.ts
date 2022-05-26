import {Err, Ok, Result} from "../result";
import * as assert from "@kurtbuilds/assert"

describe("result.ts", () => {
    it("basic", () => {
        const r = Ok(1)
        assert.equal(r.is_ok(), true)
    })
    it("map", () => {
        let r = Ok(1)
            .map(x => x + 1)
        assert.equal(r.unwrap(), 2)
    })
    it("map with async function", async () => {
        let r = Ok(1)
            .map(async x => x + 1)
            .map(async x => await x + 1)
        assert.equal(await r.unwrap(), 3)
    })
    it("and_then", () => {
        function f(x: number | string): Result<number, Error> {
            if (typeof x === "number") {
                return Ok(x + 1)
            } else {
                return Err(new Error("not a number"))
            }
        }

        let r = Ok(1)
            .and_then(f)
        assert.equal(r.unwrap(), 2)
        let s = Ok("foo")
            .and_then(f)
        assert.equal(s.is_err(), true)
    })
    it("and_then_async", async () => {
        async function f(x: number | string): Promise<Result<number, Error>> {
            if (typeof x === "number") {
                return Ok(x + 1)
            } else {
                return Err(new Error("not a number"))
            }
        }
        async function recover(e: Error): Promise<Result<number, Error>> {
            return Ok(0)
        }
        let r1 = await Ok(1).and_then_async(f)
        let r2 = await r1.and_then_async(f)
        let r3 = await r2.or_else_async(recover)
        assert.equal(r3.unwrap(), 3)
    })
    it("try_catch", async () => {
        function randomly_throws_untyped_errors_fn(x: number | string): number {
            if (typeof x === "number") {
                return x + 1
            } else {
                throw new Error("not a number")
            }
        }
        let r1 = Ok(1).try_catch(randomly_throws_untyped_errors_fn).err_as<Error>()
        // Note that this is type-safe because of the `.err_as<Error>()` call.
        let r2 = r1.map_err(err => err.stack).unwrap()
        assert.equal(typeof r2, "number")

        let r3 = Ok("a string").try_catch(randomly_throws_untyped_errors_fn).err_as<Error>()
        // Note that this is type-safe because of the `.err_as<Error>()` call.
        let r4 = r3.map_err(err => err.stack).unwrap_err()
        assert.equal(typeof r4, "string")
    })
})